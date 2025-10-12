import { useNavigate } from 'react-router-dom'
import ctaLogo from '../../assets/CTA-logo.png'
import './Header.css'
import { useUser } from '../../context/UserContext'
import { useEffect, useState } from 'react'
import Api from '../../services/Api'


export default function Header() {
  const navigate = useNavigate()
  const {user, logout} = useUser()
  const [saludo, setSaludo] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return
        
        if(user?.role === 'ADMIN') {
          const saludito = (await Api.getAdmin()).data
          setSaludo(saludito)
        } else {
          const saludito = (await Api.getUser()).data
          setSaludo(saludito)
        }
      } catch (err) {
        console.error('No se pudo obtener el usuario logueado:', err)
        logout()
      }
    }
    fetchUserRole()
  }, [user, logout])

  return (
    <header>
      <a href="/">
        <img src={ctaLogo} className="logo" alt="CTA logo" />
      </a>
      <nav>
        <button>Comprar</button>
        <button>Vender</button>
      </nav>
      <div>
        {user ? (
          <>
            <span>{saludo}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')}>Login</button>
        )}
      </div>
    </header>
  )
}
