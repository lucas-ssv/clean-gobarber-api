import { AccountModel } from '../../domain/models/account'

export const mockAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password',
  isBarber: false,
  createdAt: new Date()
})
