import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Api from '../../services/Api'
import type { PostResponseDTO } from '../../types'
import './CarDetail.css'

export default function CarDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<PostResponseDTO | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return
      try {
        const response = await Api.getPost(id)
        setPost(response.data)
      } catch (err: any) {
        setError(err.message || 'Error al cargar el auto')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  if (loading) return <p>Cargando auto...</p>
  if (error) return <p className="error">{error}</p>
  if (!post) return <p>No se encontró el auto.</p>

  return (
    <div className="car-detail">
      <img 
        src={`/images/${post.image}`} 
        alt={`${post.make} ${post.model}`} 
      />
      <h2>{post.make} {post.model}</h2>
      <p className="price">${post.price.toLocaleString('es-AR')}</p>
      <p
        className="dealerLink"
        onClick={() => navigate(`/dealer/${post.dealerId}`)}
      >
        Publicado por: {post.dealer}
      </p>
    </div>
  )
}
