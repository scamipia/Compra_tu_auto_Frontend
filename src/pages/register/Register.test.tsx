import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Register from './Register'
import Api from '../../services/Api'
import { BrowserRouter } from 'react-router-dom'

const mockSetUser = jest.fn()
jest.mock('../../context/UserContext', () => ({
  useUser: () => ({ setUser: mockSetUser })
}))

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

jest.mock('../../services/Api', () => ({
  register: jest.fn(),
  login: jest.fn()
}))

describe('Register Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza todos los campos del formulario', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    )

    expect(screen.getByPlaceholderText(/Nombre completo/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Nombre de usuario/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument()
  })

  it('llama a la API y navega correctamente cuando el registro es exitoso', async () => {
    (Api.register as jest.Mock).mockResolvedValue({
      data: { username: 'testuser', token: 'fake-token', role: 'USER' }
    })

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    )

    fireEvent.change(screen.getByPlaceholderText(/Nombre completo/i), {
      target: { value: 'Test Name' }
    })
    fireEvent.change(screen.getByPlaceholderText(/Nombre de usuario/i), {
      target: { value: 'testuser' }
    })
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: '123456' }
    })
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'USER' } })

    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }))

    await waitFor(() => {
      expect(Api.register).toHaveBeenCalledWith({
        name: 'Test Name',
        username: 'testuser',
        password: '123456',
        role: 'USER'
      })
      expect(mockSetUser).toHaveBeenCalledWith({
        id: 0,
        username: 'testuser',
        name: 'Test Name',
        role: 'USER'
      })
      expect(mockNavigate).toHaveBeenCalledWith('/')
      expect(localStorage.getItem('token')).toBe('fake-token')
    })
  })

  it('muestra mensaje de error si la API falla', async () => {
    (Api.register as jest.Mock).mockRejectedValue(new Error('Registro fallido'))

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    )

    fireEvent.change(screen.getByPlaceholderText(/Nombre completo/i), {
      target: { value: 'Test Name' }
    })
    fireEvent.change(screen.getByPlaceholderText(/Nombre de usuario/i), {
      target: { value: 'testuser' }
    })
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: '123456' }
    })
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'USER' } })

    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }))

    await waitFor(() => {
      expect(screen.getByText(/No se pudo registrar el usuario/i)).toBeInTheDocument()
    })
  })

})
