import { useState } from 'react'

const initialItems = [
  { id: 1, name: 'Dell Latitude 5440', category: 'Laptop',   status: 'Available', assignedToId: null },
  { id: 2, name: 'HP EliteDisplay E24', category: 'Monitor', status: 'Assigned',  assignedToId: 2 },
  { id: 3, name: 'Logitech MX Keys',    category: 'Keyboard', status: 'Available', assignedToId: null },
]

const emptyForm = { name: '', category: '', status: 'Available' }

export default function Items() {
  const [items, setItems] = useState(initialItems)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const raw = localStorage.getItem('currentUser')
  const currentUser = raw ? JSON.parse(raw) : null
  const isAdmin = currentUser?.role === 'admin'

  const visibleItems = isAdmin
    ? items
    : items.filter(it => it.assignedToId === currentUser?.id)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function startAdd() {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  function startEdit(item) {
    setForm({ name: item.name, category: item.category, status: item.status })
    setEditingId(item.id)
    setShowForm(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    if (editingId) {
      setItems(items.map(it => it.id === editingId ? { ...it, ...form } : it))
    } else {
      setItems([...items, { id: Date.now(), ...form }])
    }
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  function handleDelete(id) {
    setItems(items.filter(it => it.id !== id))
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{isAdmin ? 'Items' : 'My items'}</h1>
        {isAdmin && (
          <button onClick={showForm ? () => setShowForm(false) : startAdd}>
            {showForm ? 'Cancel' : '+ Add item'}
          </button>
        )}
      </div>

      {isAdmin && showForm && (
        <form onSubmit={handleSubmit} style={{ margin: '16px 0', display: 'flex', gap: 8 }}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Available</option>
            <option>Assigned</option>
            <option>Repair</option>
          </select>
          <button type="submit">{editingId ? 'Update' : 'Save'}</button>
        </form>
      )}

      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Category</th><th>Status</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {visibleItems.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.status}</td>
              {isAdmin && (
                <td style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => startEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}