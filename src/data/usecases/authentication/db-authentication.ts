import { AuthAccount } from '../../../domain/models/auth-account'
import { Authentication } from '../../../domain/usecases/authentication'
import { LoadByEmail } from '../../../domain/usecases/load-by-email'
import { Compare } from '../../protocols/criptography/compare'
import { GenerateToken } from '../../protocols/criptography/generate-token'
import { RefreshTokenRepository } from '../../protocols/db/refresh-token-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadByEmailRepository: LoadByEmail,
    private readonly hashCompare: Compare,
    private readonly generateToken: GenerateToken,
    private readonly refreshTokenRepository: RefreshTokenRepository
  ) {}

  async auth (email: string, password: string): Promise<AuthAccount> {
    const account = await this.loadByEmailRepository.loadByEmail(email)
    if (account) {
      const isValidCompare = await this.hashCompare.compare(password, account.password)
      if (isValidCompare) {
        const token = this.generateToken.generate(account.id)
        await this.refreshTokenRepository.refresh(token, account.id)
        return {
          name: account.name,
          email: account.email,
          token
        }
      }
    }
    return null
  }
}
