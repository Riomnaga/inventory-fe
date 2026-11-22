const mockUsers = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Tech' },
  { id: 3, name: 'Carol', email: 'carol@example.com', role: 'Client' },
]

export default function Users() {
  return (
    <div>
      <h1>Users</h1>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th></tr>
        </thead>
        <tbody>
          {mockUsers.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}