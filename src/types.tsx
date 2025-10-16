export type User = {
  id: number
  username: string
  name: string
  role: 'USER' | 'ADMIN' | null
}

export type LoginResponse = {
  username: string
  token: string
  role: 'USER' | 'ADMIN' | null
}

export interface PostResponseDTO {
  id: number
  price: number
  make: string
  model: string
  dealerId: number
  dealer: string
  image: string
}

export interface Dealer {
  id: string
  name: string
  posts: PostResponseDTO[]
}

export interface ModelCardProps {
  id: number
  name: string
  price: string
  imageUrl: string
  dealer: { id: number; name: string }
}