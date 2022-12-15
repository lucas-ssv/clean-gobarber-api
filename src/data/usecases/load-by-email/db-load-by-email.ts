import { Account } from '../../../domain/models/account'
import { LoadByEmail } from '../../../domain/usecases/load-by-email'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'

export class DbLoadByEmail implements LoadByEmail<Account> {
  constructor (private readonly loadByEmailRepository: LoadByEmailRepository<Account>) {}

  async loadByEmail (email: string): Promise<Account> {
    const accountByEmail = await this.loadByEmailRepository.loadByEmail(email)
    if (accountByEmail) {
      return accountByEmail
    }
    return null as any
  }
}