import { User, Task, House, Person, Role } from './individual';

export type EntityTypeMap = {
  users: User;
  tasks: Task;
  houses: House;
  people: Person;
  roles: Role;
};

export type EntityType = keyof EntityTypeMap;
export type Entity = EntityTypeMap[EntityType];

// Remove getEntityTypeString - it's not reliable or necessary
