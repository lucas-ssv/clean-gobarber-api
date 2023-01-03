import { mockLoadAccount } from '../../../domain/tests/account/mock-load-account'
import { LoadAccount } from '../../../domain/usecases/load-account'
import { LoadAccountRepository } from '../../protocols/db/load-account-repository'

export class LoadAccountRepositoryStub implements LoadAccountRepository {
  async load (id: string): Promise<LoadAccount.Result> {
    return mockLoadAccount()
  }
}