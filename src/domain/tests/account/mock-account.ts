import { Account } from '../../models/account'

export const mockAccount = (): Account => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password',
  isBarber: false
})