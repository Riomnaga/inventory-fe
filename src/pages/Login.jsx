import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const FAKE_USERS = {
  admin: { password: '1234', id: 1, role: 'admin', name: 'Administrator' },
  user:  { password: '1234', id: 2, role: 'user',  name: 'Regular User' },
}

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const account = FAKE_USERS[username.trim().toLowerCase()]
    if (!account || account.password !== password) {
      setError('Username or password is incorrect. Check them and try again.')
      return
    }
    localStorage.setItem('currentUser', JSON.stringify({
      id: account.id, username, role: account.role, name: account.name,
    }))
    navigate('/')
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <div className="login-tag" aria-hidden="true" />
        <h1 className="login-title">Inventory</h1>
        <p className="login-subtitle">Sign in to manage IT equipment.</p>

        <label className="login-field">
          <span>Username</span>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
            autoFocus
          />
        </label>

        <label className="login-field">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>

        {error && <p className="login-error" role="alert">{error}</p>}

        <button type="submit" className="login-button">Sign in</button>

        <p className="login-hint">Demo accounts: admin or user, password 1234</p>
      </form>
    </div>
  )
}