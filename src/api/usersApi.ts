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

const requestJson = async <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const response = await fetch(input, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error('Request failed');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
};

export function listUsers() {
  return requestJson<User[]>('/api/users');
}

export function createUser(input: UserInput) {
  return requestJson<User>('/api/users', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateUser(id: number, input: UserInput) {
  return requestJson<User>(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}

export function deleteUser(id: number) {
  return requestJson<void>(`/api/users/${id}`, {
    method: 'DELETE',
  });
}
