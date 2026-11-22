const stats = [
  { label: 'Total items', value: 128 },
  { label: 'Assigned devices', value: 74 },
  { label: 'Users', value: 31 },
]

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
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