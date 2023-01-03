import { LoadAccount } from '../../usecases/load-account'

export const mockLoadAccount = (): LoadAccount.Result => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password',
  isBarber: false
})