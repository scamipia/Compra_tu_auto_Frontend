import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import App from './App'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import CarDetail from './pages/carDetail/CarDetail'
import Dealer from './pages/dealer/Dealer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<CarDetail />} />
          <Route path="/dealer/:id" element={<Dealer />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>,
)
