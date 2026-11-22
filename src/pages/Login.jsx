export default function Login() {
  return (
    <div style={{ maxWidth: 320, margin: '80px auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h1>Login</h1>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Sign in</button>
    </div>
  )
}