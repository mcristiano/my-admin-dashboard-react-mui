import { localDbService } from './localDbService';
import { EntityType, EntityTypeMap } from '../types/EntityType';

const createDbService = () => {
  const entityService = <K extends EntityType>(entityType: K) => ({
    getAll: () => localDbService.getAll(entityType),
    getById: (id: number | string) => localDbService.getById(entityType, id),
    create: (data: Omit<EntityTypeMap[K], 'id'>) => localDbService.create(entityType, data),
    update: (id: number | string, data: Partial<EntityTypeMap[K]>) => localDbService.update(entityType, id, data),
    delete: (id: number | string) => localDbService.delete(entityType, id),
  });

  return {
    users: entityService('users'),
    tasks: entityService('tasks'),
    houses: entityService('houses'),
    people: entityService('people'),
    roles: entityService('roles'), // Add roles service
  } as const;
};

export const db = createDbService();
