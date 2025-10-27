import type { ModelCardProps } from '../../types'
import './ModelCard.css'
import { useNavigate } from 'react-router-dom'

export default function ModelCard({ id, name, price, imageUrl, dealer }: ModelCardProps) {
  const navigate = useNavigate()

  return (
    <div className="modelo-card" onClick={() => navigate(`/post/${id}`)}>
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p className="price">{price}</p>

      <p
        className="dealer"
        onClick={(e) => {
          e.stopPropagation()
          navigate(`/dealer/${dealer.id}`)
        }}
      >
        {dealer.name}
      </p>
    </div>
  )
}
