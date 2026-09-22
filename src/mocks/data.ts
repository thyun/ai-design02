import type { User } from '../mockUsersApi';

let users: User[] = [
  { id: 1, name: 'Olivia Kim', email: 'olivia@company.com', role: 'Admin', status: 'Active', lastLogin: '2 min ago' },
  { id: 2, name: 'Daniel Park', email: 'daniel@company.com', role: 'Manager', status: 'Active', lastLogin: '18 min ago' },
  { id: 3, name: 'Mina Cho', email: 'mina@company.com', role: 'Editor', status: 'Invited', lastLogin: '—' },
  { id: 4, name: 'Jason Lee', email: 'jason@company.com', role: 'Viewer', status: 'Suspended', lastLogin: '3 days ago' },
];

export function getUsers() {
  return structuredClone(users);
}

export function addUser(input: Omit<User, 'id'>) {
  const user = { ...input, id: Date.now() };
  users = [user, ...users];
  return structuredClone(user);
}

export function editUser(id: number, input: Omit<User, 'id'>) {
  users = users.map((user) => (user.id === id ? { ...user, ...input, id } : user));
  const updated = users.find((user) => user.id === id);
  if (!updated) {
    throw new Error('User not found');
  }
  return structuredClone(updated);
}

export function removeUser(id: number) {
  users = users.filter((user) => user.id !== id);
}
