import { Account } from '../../../domain/models/account'
import { AuthAccount } from '../../../domain/models/auth-account'
import { Authentication } from '../../../domain/usecases/authentication'
import { Compare } from '../../protocols/criptography/compare'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadByEmailRepository: LoadByEmailRepository<Account>,
    private readonly compare: Compare
  ) {}

  async auth (email: string, password: string): Promise<AuthAccount> {
    const account = await this.loadByEmailRepository.loadByEmail(email)
    if (account) {
      await this.compare.compare(password, account.password)
    }
    return null as any
  }
}