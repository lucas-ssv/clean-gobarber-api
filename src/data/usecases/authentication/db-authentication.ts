import { AuthAccount } from '../../../domain/models/auth-account'
import { Authentication } from '../../../domain/usecases/authentication'
import { Compare } from '../../protocols/criptography/compare'
import { Signer } from '../../protocols/criptography/signer'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'
import { RefreshTokenRepository } from '../../protocols/db/refresh-token-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadByEmailRepository: LoadByEmailRepository,
    private readonly hashCompare: Compare,
    private readonly generateToken: Signer,
    private readonly refreshTokenRepository: RefreshTokenRepository
  ) {}

  async auth (email: string, password: string): Promise<AuthAccount> {
    const account = await this.loadByEmailRepository.loadByEmail(email)
    if (account) {
      const isValidCompare = await this.hashCompare.compare(password, account.password)
      if (isValidCompare) {
        const token = await this.generateToken.sign(account.id)
        await this.refreshTokenRepository.refreshToken(account.id, token)
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
