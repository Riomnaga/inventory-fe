import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 200, padding: 16, background: '#222', color: '#fff' }}>
        <h2>Inventory</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Link to="/" style={{ color: '#fff' }}>Dashboard</Link>
          <Link to="/items" style={{ color: '#fff' }}>Items</Link>
          <Link to="/users" style={{ color: '#fff' }}>Users</Link>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: 24 }}>
        <Outlet />
      </main>
    </div>
  )
}