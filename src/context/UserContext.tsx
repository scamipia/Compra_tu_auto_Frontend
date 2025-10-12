import { createContext, useState, useContext, useEffect } from 'react'
import type { ReactNode } from 'react'
import Api from '../services/Api'
import type { User, LoginResponse } from '../types'

interface UserContextProps {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const UserContext = createContext<UserContextProps | undefined>(undefined)

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser)
      setUser(parsed)
    } catch (err) {
      console.error("Error parseando user desde localStorage:", err)
      localStorage.removeItem('user')
    }
  }
}, [])

  const login = async (username: string, password: string) => {
    try {
      const res = await Api.login({ username, password })
      const { token, username: uname, role }: LoginResponse = res.data

      const user: User = {
        id: 0,
        username: uname,
        name: uname,
        role,
      }

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
    } catch (err) {
      console.error('Error en login:', err)
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser debe usarse dentro de UserProvider')
  return context
}

export { UserContext, UserProvider, useUser }
