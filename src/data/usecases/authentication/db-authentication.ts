import { AuthAccount } from '../../../domain/models/auth-account'
import { Authentication } from '../../../domain/usecases/authentication'
import { LoadByEmail } from '../../../domain/usecases/load-by-email'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadByEmailRepository: LoadByEmail) {}

  async auth (email: string, password: string): Promise<AuthAccount> {
    await this.loadByEmailRepository.loadByEmail(email)
    return await Promise.resolve(null)
  }
}
