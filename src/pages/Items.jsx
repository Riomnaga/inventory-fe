import { useState } from 'react'

const initialItems = [
  { id: 1, name: 'Dell Latitude 5440', category: 'Laptop', status: 'Available' },
  { id: 2, name: 'HP EliteDisplay E24', category: 'Monitor', status: 'Assigned' },
  { id: 3, name: 'Logitech MX Keys', category: 'Keyboard', status: 'Available' },
]

export default function Items() {
  const [items, setItems] = useState(initialItems)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', category: '', status: 'Available' })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleAdd(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    const newItem = { id: Date.now(), ...form }
    setItems([...items, newItem])
    setForm({ name: '', category: '', status: 'Available' })
    setShowForm(false)
  }

  function handleDelete(id) {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Items</h1>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add item'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} style={{ margin: '16px 0', display: 'flex', gap: 8 }}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Available</option>
            <option>Assigned</option>
            <option>Repair</option>
          </select>
          <button type="submit">Save</button>
        </form>
      )}

      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Category</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.status}</td>
              <td><button onClick={() => handleDelete(item.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}