export interface Role {
  id: number;
  name: 'user' | 'admin' | 'readonly';
  description: string;
}
