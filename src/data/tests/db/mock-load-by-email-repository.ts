import { Account } from '../../../domain/models/account'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'

export class LoadByEmailRepositoryStub implements LoadByEmailRepository<Account> {
  async loadByEmail (email: string): Promise<Account> {
    return await Promise.resolve(null) as any
  }
}