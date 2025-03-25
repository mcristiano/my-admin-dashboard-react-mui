import { EntityType, EntityTypeMap } from '../types/EntityType';

const DB_NAME = 'myLocalDatabase';
const DB_VERSION = 1;

const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('tasks')) {
        db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('houses')) {
        db.createObjectStore('houses', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('people')) {
        db.createObjectStore('people', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('roles')) {
        db.createObjectStore('roles', { keyPath: 'id', autoIncrement: true }); // Add roles object store
      }
    };
  });
};

const executeTransaction = (
  db: IDBDatabase,
  storeName: EntityType,
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => void
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, mode);
    const store = transaction.objectStore(storeName);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);

    operation(store);
  });
};

export const localDbService = {
  getAll: async <K extends EntityType>(entityType: K): Promise<EntityTypeMap[K][]> => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      executeTransaction(db, entityType, 'readonly', (store) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result as EntityTypeMap[K][]);
        request.onerror = () => reject(request.error);
      }).finally(() => db.close());
    });
  },

  getById: async <K extends EntityType>(entityType: K, id: number | string): Promise<EntityTypeMap[K] | undefined> => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      executeTransaction(db, entityType, 'readonly', (store) => {
        const request = store.get(id);
        request.onsuccess = () => resolve(request.result as EntityTypeMap[K] | undefined);
        request.onerror = () => reject(request.error);
      }).finally(() => db.close());
    });
  },

  create: async <K extends EntityType>(entityType: K, data: Omit<EntityTypeMap[K], 'id'>): Promise<EntityTypeMap[K]> => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      executeTransaction(db, entityType, 'readwrite', (store) => {
        const request = store.add(data);
        request.onsuccess = () => {
          const newId = request.result;
          localDbService.getById(entityType, newId).then(retrievedData => {
            if (retrievedData) {
              resolve(retrievedData);
            } else {
              reject(new Error("Failed to retrieve newly created object."));
            }
          });
        };
        request.onerror = () => reject(request.error);
      }).finally(() => db.close());
    });
  },

  update: async <K extends EntityType>(entityType: K, id: number | string, data: Partial<EntityTypeMap[K]>): Promise<EntityTypeMap[K]> => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      executeTransaction(db, entityType, 'readwrite', (store) => {
        const getRequest = store.get(id);

        getRequest.onsuccess = () => {
          const existingData = getRequest.result;
          if (!existingData) {
            reject(new Error(`${entityType} with id ${id} not found`));
            return;
          }

          const updatedData = { ...existingData, ...data };
          const updateRequest = store.put(updatedData);

          updateRequest.onsuccess = () => resolve(updatedData as EntityTypeMap[K]);
          updateRequest.onerror = () => reject(updateRequest.error);
        };
        getRequest.onerror = () => reject(getRequest.error);
      }).finally(() => db.close());
    });
  },

  delete: async <K extends EntityType>(entityType: K, id: number | string): Promise<void> => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      executeTransaction(db, entityType, 'readwrite', (store) => {
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      }).finally(() => db.close());
    });
  },
};
