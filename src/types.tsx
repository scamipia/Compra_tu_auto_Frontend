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