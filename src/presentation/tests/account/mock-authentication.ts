import { AuthAccount } from '../../../domain/models/auth-account'
import { Authentication } from '../../../domain/usecases/authentication'

export class AuthenticationStub implements Authentication {
  async auth (email: string, password: string): Promise<AuthAccount> {
    return {
      name: 'any_name',
      email: 'any_email@mail.com',
      token: 'any_token'
    }
  }
}