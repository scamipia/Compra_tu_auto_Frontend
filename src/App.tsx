import './App.css'
import ctaLogo from './assets/CTA-logo.png'  // 👈 importás tu logo

function App() {

  return (
    <>
      <div>
        <a href="/" target="_blank">
          <img src={ctaLogo} className="logo" alt="CTA logo" />
        </a>
      </div>
      <h1>Compra tu auto</h1>
    </>
  )
}

export default App
