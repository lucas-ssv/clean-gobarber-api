import { AuthAccount } from '../../../domain/models/auth-account'
import { Authentication } from '../../../domain/usecases/authentication'

export const mockAuthAccount = (): AuthAccount => ({
  id: 'any_id',
  token: 'any_token'
})

export class AuthenticationStub implements Authentication {
  async auth (email: string, password: string): Promise<AuthAccount> {
    return mockAuthAccount()
  }
}