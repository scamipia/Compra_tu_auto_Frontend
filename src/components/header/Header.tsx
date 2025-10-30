import { useNavigate } from 'react-router-dom'
import ctaLogo from '../../assets/CTA-logo.png'
import './Header.css'
import { useUser } from '../../context/UserContext'

export default function Header() {
  const navigate = useNavigate()
  const { user, logout } = useUser()

  return (
    <header>
      <img
        src={ctaLogo}
        className="logo"
        alt="CTA logo"
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}
      />

      <nav>
        <button>Comprar</button>
        <button>Vender</button>
      </nav>

      <div className="user-section">
        {user ? (
          <button className="logout" onClick={logout}>Logout</button>
        ) : (
          <button className="login" onClick={() => navigate('/login')}>Login</button>
        )}
      </div>
    </header>
  )
}
