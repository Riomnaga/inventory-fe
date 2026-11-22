import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FAKE_USERS = {
  admin: { password: '1234', role: 'admin', name: 'Administrator' },
  user:  { password: '1234', role: 'user',  name: 'Regular User' },
}

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const account = FAKE_USERS[username]
    if (!account || account.password !== password) {
      setError('Invalid credentials')
      return
    }
    localStorage.setItem('currentUser', JSON.stringify({
      username, role: account.role, name: account.name,
    }))
    navigate('/')
  }

  return (
    <div style={{ maxWidth: 320, margin: '80px auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h1>Login</h1>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleSubmit}>Sign in</button>
      <small>Try: admin / 1234 or user / 1234</small>
    </div>
  )
}