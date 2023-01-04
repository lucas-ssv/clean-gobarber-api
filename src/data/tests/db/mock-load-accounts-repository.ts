import { mockAccounts } from '../../../domain/tests/account/mock-accounts'
import { LoadAccounts } from '../../../domain/usecases/load-accounts'
import { LoadAccountsRepository } from '../../protocols/db/load-accounts-repository'

export class LoadAccountsRepositoryStub implements LoadAccountsRepository {
  async loadAll (params: LoadAccounts.Params): Promise<LoadAccountsRepository.Result> {
    return mockAccounts()
  }
}