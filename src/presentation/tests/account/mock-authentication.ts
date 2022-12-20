import { AuthAccount } from '../../../domain/models/auth-account'
import { Authentication } from '../../../domain/usecases/authentication'

export const mockAuthAccount = (): AuthAccount => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  token: 'any_token'
})

export class AuthenticationStub implements Authentication {
  async auth (email: string, password: string): Promise<AuthAccount> {
    return mockAuthAccount()
  }
}