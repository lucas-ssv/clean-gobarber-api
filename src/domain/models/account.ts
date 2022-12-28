import { Avatar } from './avatar'

export interface Account {
  id: string
  name: string
  email: string
  password: string
  isBarber: boolean
  avatar?: Avatar
}