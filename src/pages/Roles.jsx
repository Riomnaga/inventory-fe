const roles = [
  { id: 1, name: 'Administrator', description: 'Full access to users, inventory, and requests' },
  { id: 2, name: 'User', description: 'Can view profile, browse items, request loans/returns' },
]

export default function Roles() {
  return (
    <div>
      <h1>Roles</h1>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Description</th></tr>
        </thead>
        <tbody>
          {roles.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td><td>{r.name}</td><td>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}