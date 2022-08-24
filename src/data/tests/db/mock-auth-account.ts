import { AuthAccount } from '../../../domain/models/auth-account'

export const mockAuthAccount = (): AuthAccount => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  token: 'any_token'
})
