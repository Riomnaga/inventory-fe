export default function Dashboard() {
  const raw = localStorage.getItem('currentUser')
  const currentUser = raw ? JSON.parse(raw) : null
  const isAdmin = currentUser?.role === 'admin'

  const adminStats = [
    { label: 'Total items',      value: 128 },
    { label: 'Assigned devices', value: 74 },
    { label: 'Users',            value: 31 },
  ]

  const userStats = [
    { label: 'My assigned items',     value: 2 },
    { label: 'My pending requests',   value: 0 },
    { label: 'Items available to me', value: 54 },
  ]

  const stats = isAdmin ? adminStats : userStats

  return (
    <div>
      <h1>{isAdmin ? 'Admin Dashboard' : 'My Dashboard'}</h1>
      <div style={{ display: 'flex', gap: 16 }}>
        {stats.map(s => (
          <div key={s.label} style={{ border: '1px solid #ccc', padding: 16, minWidth: 140 }}>
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>{s.value}</div>
            <div>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}