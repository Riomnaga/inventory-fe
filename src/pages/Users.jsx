import { useState } from 'react'

const initialUsers = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob',   email: 'bob@example.com',   role: 'user' },
  { id: 3, name: 'Carol', email: 'carol@example.com', role: 'user' },
]

const emptyForm = { name: '', email: '', role: 'user' }

export default function Users() {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const visibleUsers = users.filter(u =>
    (u.name + u.email).toLowerCase().includes(search.toLowerCase())
  )

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function startAdd() {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  function startEdit(user) {
    setForm({ name: user.name, email: user.email, role: user.role })
    setEditingId(user.id)
    setShowForm(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return
    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...u, ...form } : u))
    } else {
      setUsers([...users, { id: Date.now(), ...form }])
    }
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  function handleDelete(id) {
    setUsers(users.filter(u => u.id !== id))
  }

  function toggleRole(id) {
    setUsers(users.map(u =>
      u.id === id ? { ...u, role: u.role === 'admin' ? 'user' : 'admin' } : u
    ))
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Users</h1>
        <button onClick={showForm ? () => setShowForm(false) : startAdd}>
          {showForm ? 'Cancel' : '+ Add user'}
        </button>
      </div>

      <input
        placeholder="Search by name or email"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ margin: '12px 0', width: 280 }}
      />

      {showForm && (
        <form onSubmit={handleSubmit} style={{ margin: '12px 0', display: 'flex', gap: 8 }}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          <button type="submit">{editingId ? 'Update' : 'Save'}</button>
        </form>
      )}

      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleUsers.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => toggleRole(u.id)} style={{ minWidth: 70 }}>
                  {u.role}
                </button>
              </td>
              <td style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => startEdit(u)}>Edit</button>
                <button onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}