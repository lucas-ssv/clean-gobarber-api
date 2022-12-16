import { Account } from '../../../domain/models/account'
import { AuthAccount } from '../../../domain/models/auth-account'
import { Authentication } from '../../../domain/usecases/authentication'
import { Compare } from '../../protocols/criptography/compare'
import { Signer } from '../../protocols/criptography/signer'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadByEmailRepository: LoadByEmailRepository<Account>,
    private readonly compare: Compare,
    private readonly signer: Signer
  ) {}

  async auth (email: string, password: string): Promise<AuthAccount> {
    const account = await this.loadByEmailRepository.loadByEmail(email)
    if (account) {
      const isPasswordMatch = await this.compare.compare(password, account.password)
      if (isPasswordMatch) {
        await this.signer.sign({
          name: account.name,
          email
        })
      }
    }
    return null as any
  }
}