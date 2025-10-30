import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../../services/Api'
import { useUser } from '../../context/UserContext'
import type { Car } from '../../types'
import './Publish.css'

export default function Publish() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    carId: '',
    price: '',
    description: ''
  })

  useEffect(() => {
    // Verificar que el usuario es dealer
    if (!user) {
      navigate('/login')
      return
    }

    if (user.role !== 'DEALER') {
      setError('Solo los dealers pueden acceder a esta página')
      setTimeout(() => navigate('/'), 3000)
      return
    }

    // Cargar lista de autos
    const fetchCars = async () => {
      try {
        const response = await Api.getAllCars()
        setCars(response.data)
      } catch (err: any) {
        console.error('Error cargando autos:', err)
        setError(err.message || 'Error al cargar los autos disponibles')
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [user, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    try {
      await Api.publishPost({
        carId: Number(formData.carId),
        price: Number(formData.price),
        description: formData.description
      })
      
      setSuccess(true)
      setFormData({ carId: '', price: '', description: '' })
      
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (err: any) {
      setError(err.response?.data || err.message || 'Error al publicar el auto')
    }
  }

  if (!user || user.role !== 'DEALER') {
    return null
  }

  if (loading) return <div className="publish-container"><p>Cargando...</p></div>

  return (
    <div className="publish-container">
      <h2>Publicar Auto</h2>
      
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">¡Auto publicado exitosamente!</p>}
      
      <form onSubmit={handleSubmit} className="publish-form">
        <div className="form-group">
          <label htmlFor="carId">Seleccionar Auto:</label>
          <select
            id="carId"
            value={formData.carId}
            onChange={(e) => setFormData({ ...formData, carId: e.target.value })}
            required
          >
            <option value="">-- Seleccione un auto --</option>
            {Array.isArray(cars) && cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.make} {car.model} ({car.year}) - {car.color} | {car.fuelType}, {car.transmission}, {car.horsepower} HP
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="Ingrese el precio"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe las características del auto..."
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Publicar Auto
        </button>
      </form>
    </div>
  )
}

