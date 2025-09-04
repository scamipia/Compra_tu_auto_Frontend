import ctaLogo from '../../assets/CTA-logo.png'
import './Header.css'

export default function Header() {
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
        <button>Login</button>
      </div>
    </header>
  )
}
