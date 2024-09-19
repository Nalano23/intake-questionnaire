export interface User  {
    id: number;
    username: string;
    password: string;
    role: 'user' | 'admin';
  };
  
export const users: User[] = [
{ id: 1, username: 'user', password: '123', role: 'user' },
{ id: 2, username: 'user2', password: '123', role: 'user' },
{ id: 3, username: 'admin', password: '123', role: 'admin' },
];
  
  