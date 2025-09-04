import './ModelCard.css'

interface ModelCardProps {
  name: string
  price: string
  imageUrl: string
}

export default function ModelCard({ name, price, imageUrl }: ModelCardProps) {
  return (
    <div className="modelo-card">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>{price}</p>
    </div>
  )
}
