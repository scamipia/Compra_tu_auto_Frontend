import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../../services/Api'
import { useUser } from '../../context/UserContext'
import './Register.css'

export default function Register() {
  const { setUser } = useUser()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('USER')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await Api.register({ name, username, password, role })
      const { username: uname, token, role: userRole } = res.data

      const newUser = {
        id: 0,
        username: uname,
        name,
        role: userRole
      }

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(newUser))

      setUser(newUser)

      navigate('/')
    } catch (err) {
      console.error('Error en registro:', err)
      setError('No se pudo registrar el usuario. Verifica los datos.')
    }
  }

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>Registro</h2>
        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="USER">Usuario</option>
          <option value="ADMIN">Administrador</option>
        </select>

        <button type="submit">Registrarse</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}
