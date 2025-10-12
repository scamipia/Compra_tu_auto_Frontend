import { useState } from 'react'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const { login } = useUser()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await login(username, password)
      navigate('/')
    } catch {
      setError('Usuario o contraseña incorrecta')
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
        {error && <p className="error">{error}</p>}
        
        <div className="register-link">
          <p>¿No tenés cuenta?</p>
          <button
            type="button"
            className="register-button"
            onClick={() => navigate('/register')}
          >
            Registrarse
          </button>
        </div>
        
      </form>
    </div>
  )
}
