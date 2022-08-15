import { AccountModel } from '../../domain/models/account'
import { LoadByEmailRepository } from '../protocols/db/load-by-email-repository'
import { mockAccount } from './mock-account'

export class LoadByEmailRepositoryStub implements LoadByEmailRepository {
  async loadByEmail (email: string): Promise<AccountModel> {
    return await Promise.resolve(mockAccount())
  }
}
