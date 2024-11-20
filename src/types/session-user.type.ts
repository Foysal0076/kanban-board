import { Role } from '@/types/role.type'

export type User = {
  id: string
  name: string
  email: string
  password: string
  role: Role
}

export type SessionUser = Omit<User, 'password'>
