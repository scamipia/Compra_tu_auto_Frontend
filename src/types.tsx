export type User = {
  id: number
  username: string
  name: string
  role: 'COSTUMER' | 'ADMIN' | 'DEALER' | null
}

export type LoginResponse = {
  username: string
  token: string
  role: 'COSTUMER' | 'ADMIN' | 'DEALER' | null
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

export interface Car {
  id: number
  make: string
  model: string
  year: number
  color: string
  image: string
  fuelType: string
  doors: number
  transmission: string
  horsepower: number
}

export interface PublishData {
  price: number
  carId: number
  description: string
}