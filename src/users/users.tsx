import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { createUser, deleteUser, listUsers, updateUser, type User, type UserRole } from '../mockUsersApi';
import './users.css';

type UserFormState = {
  name: string;
  email: string;
  role: UserRole;
  status: User['status'];
  lastLogin: string;
};

const emptyForm: UserFormState = {
  name: '',
  email: '',
  role: 'Viewer',
  status: 'Active',
  lastLogin: '—',
};

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<UserFormState>(emptyForm);

  useEffect(() => {
    listUsers()
      .then((data) => {
        setUsers(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const selectedUser = useMemo(() => users.find((user) => user.id === editingId) ?? null, [users, editingId]);

  useEffect(() => {
    if (selectedUser) {
      setForm({
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
        status: selectedUser.status,
        lastLogin: selectedUser.lastLogin,
      });
    }
  }, [selectedUser]);

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editingId) {
      const updated = await updateUser(editingId, form);
      setUsers((current) => current.map((user) => (user.id === editingId ? updated : user)));
    } else {
      const created = await createUser(form);
      setUsers((current) => [created, ...current]);
    }
    resetForm();
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    setUsers((current) => current.filter((user) => user.id !== id));
    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <div className="users-page">
      <header className="hero-card">
        <div className="hero-copy">
          <span className="soft-pill">Users</span>
          <h1>사용자 계정을 관리하세요</h1>
          <p>mock API로 목록 조회, 생성, 수정, 삭제가 동작하는 사용자 관리 페이지입니다.</p>
        </div>
      </header>

      <section className="users-layout">
        <article className="mockup-card">
          <div className="section-head">
            <div>
              <span className="eyebrow">Directory</span>
              <h2>User list</h2>
            </div>
            <span className="section-note tabular">{users.length} total</span>
          </div>

          {loading ? (
            <p className="empty-state">Loading users...</p>
          ) : (
            <div className="table-wrap">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <span className={`status-chip ${user.status.toLowerCase()}`}>{user.status}</span>
                      </td>
                      <td className="tabular">{user.lastLogin}</td>
                      <td>
                        <div className="row-actions">
                          <button className="secondary-button" onClick={() => setEditingId(user.id)}>
                            Edit
                          </button>
                          <button className="danger-button" onClick={() => handleDelete(user.id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>

        <article className="cream-card">
          <div className="section-head">
            <div>
              <span className="eyebrow">{editingId ? 'Edit user' : 'Create user'}</span>
              <h2>{editingId ? 'Update profile' : 'New profile'}</h2>
            </div>
            <button className="dark-button" onClick={resetForm}>
              Reset
            </button>
          </div>

          <form className="user-form" onSubmit={handleSubmit}>
            <label>
              <span>Name</span>
              <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            </label>
            <label>
              <span>Email</span>
              <input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
            </label>
            <label>
              <span>Role</span>
              <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value as UserRole })}>
                <option>Admin</option>
                <option>Manager</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
            </label>
            <label>
              <span>Status</span>
              <select
                value={form.status}
                onChange={(event) => setForm({ ...form, status: event.target.value as User['status'] })}
              >
                <option>Active</option>
                <option>Invited</option>
                <option>Suspended</option>
              </select>
            </label>
            <label>
              <span>Last login</span>
              <input
                value={form.lastLogin}
                onChange={(event) => setForm({ ...form, lastLogin: event.target.value })}
              />
            </label>

            <div className="form-actions">
              <button className="primary-button" type="submit">
                {editingId ? 'Save changes' : 'Create user'}
              </button>
              {editingId ? (
                <button className="secondary-button" type="button" onClick={resetForm}>
                  Cancel edit
                </button>
              ) : null}
            </div>
          </form>
        </article>
      </section>
    </div>
  );
}

export default UsersPage;
