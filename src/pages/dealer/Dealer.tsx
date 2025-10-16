import { useParams } from 'react-router-dom'
import './Dealer.css'
import ModelCard from '../../components/modelCard/ModelCard'
import { useEffect, useState } from 'react'
import type { Dealer, PostResponseDTO } from '../../types'
import Api from '../../services/Api'

export default function Dealer() {
  const { id } = useParams()
  const [dealer, setDealer] = useState<Dealer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    const fetchDealer = async () => {
      try {
        const response = await Api.getDealer(id!)
        const data = response.data
        const dealerData: Dealer = {
          id: data.id.toString(),
          name: data.name,
          posts: data.posts
        }
        setDealer(dealerData)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchDealer()
  }, [id])

  if (loading) return <p>Cargando concesionaria...</p>
  if (error) return <p className="error">{error}</p>
  if (!dealer || dealer.posts.length === 0) return <p>No se encontraron autos en esta concesionaria.</p>

  return (
    <div className="dealer-page">
      <h2>{dealer.name}</h2>
      <div className="modelos">
        {dealer.posts.map((post: PostResponseDTO) => (
          <ModelCard
            key={post.id}
            id={post.id}  // <- usamos el id real del post
            name={`${post.make} ${post.model}`}
            price={`$${post.price.toLocaleString('es-AR')}`}
            imageUrl={`/images/${post.image}`} 
            dealer={{ id: Number(id), name: post.dealer }}
          />
        ))}
      </div>
    </div>
  )
}
