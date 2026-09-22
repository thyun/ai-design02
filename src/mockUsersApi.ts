export type UserRole = 'Admin' | 'Manager' | 'Editor' | 'Viewer';

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Invited' | 'Suspended';
  lastLogin: string;
};

type UserInput = Omit<User, 'id'>;

let users: User[] = [
  { id: 1, name: 'Olivia Kim', email: 'olivia@company.com', role: 'Admin', status: 'Active', lastLogin: '2 min ago' },
  { id: 2, name: 'Daniel Park', email: 'daniel@company.com', role: 'Manager', status: 'Active', lastLogin: '18 min ago' },
  { id: 3, name: 'Mina Cho', email: 'mina@company.com', role: 'Editor', status: 'Invited', lastLogin: '—' },
  { id: 4, name: 'Jason Lee', email: 'jason@company.com', role: 'Viewer', status: 'Suspended', lastLogin: '3 days ago' },
];

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

export async function listUsers() {
  await wait(180);
  return structuredClone(users);
}

export async function createUser(input: UserInput) {
  await wait(180);
  const next = { ...input, id: Date.now() };
  users = [next, ...users];
  return structuredClone(next);
}

export async function updateUser(id: number, input: UserInput) {
  await wait(180);
  users = users.map((user) => (user.id === id ? { ...user, ...input, id } : user));
  const updated = users.find((user) => user.id === id);
  if (!updated) {
    throw new Error('User not found');
  }
  return structuredClone(updated);
}

export async function deleteUser(id: number) {
  await wait(180);
  users = users.filter((user) => user.id !== id);
}
