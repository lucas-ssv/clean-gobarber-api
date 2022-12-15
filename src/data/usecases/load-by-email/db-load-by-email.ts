import { Account } from '../../../domain/models/account'
import { LoadByEmail } from '../../../domain/usecases/load-by-email'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'

export class DbLoadByEmail implements LoadByEmail<Account> {
  constructor (private readonly loadByEmailRepository: LoadByEmailRepository<Account>) {}

  async loadByEmail (email: string): Promise<Account> {
    await this.loadByEmailRepository.loadByEmail(email)
    return null as any
  }
}