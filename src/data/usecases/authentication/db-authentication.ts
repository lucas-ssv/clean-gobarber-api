import { AuthAccount } from '../../../domain/models/auth-account'
import { Authentication } from '../../../domain/usecases/authentication'
import { LoadByEmail } from '../../../domain/usecases/load-by-email'
import { Compare } from '../../protocols/criptography/compare'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadByEmailRepository: LoadByEmail,
    private readonly hashCompare: Compare
  ) {}

  async auth (email: string, password: string): Promise<AuthAccount> {
    const account = await this.loadByEmailRepository.loadByEmail(email)
    if (account) {
      await this.hashCompare.compare(password, account.password)
    }
    return null
  }
}
