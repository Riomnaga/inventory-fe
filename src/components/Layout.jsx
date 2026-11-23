import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'

export default function Layout() {
  const raw = localStorage.getItem('currentUser')
  const currentUser = raw ? JSON.parse(raw) : null
  const isAdmin = currentUser?.role === 'admin'
  const navigate = useNavigate()
  
  if (!currentUser){
    return <Navigate to="/login" replace/>
  }

  function handleLogout() {
    localStorage.removeItem('currentUser')
    navigate('/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 200, padding: 16, background: '#222', color: '#fff' }}>
        <h2>Inventory</h2>
        <div style={{ fontSize: 12, color: '#aaa', marginBottom: 12 }}>
          {currentUser ? `${currentUser.name} (${currentUser.role})` : 'Not logged in'}
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Link to="/" style={{ color: '#fff' }}>Dashboard</Link>
          <Link to="/items" style={{ color: '#fff' }}>Items</Link>
          {isAdmin && <Link to="/users" style={{ color: '#fff' }}>Users</Link>}
          {currentUser && <Link to="/profile" style={{ color: '#fff' }}>My Profile</Link>}
        </nav>
        {currentUser && (
          <button onClick={handleLogout} style={{ marginTop: 24 }}>Log out</button>
        )}
      </aside>
      <main style={{ flex: 1, padding: 24 }}>
        <Outlet />
      </main>
    </div>
  )
}