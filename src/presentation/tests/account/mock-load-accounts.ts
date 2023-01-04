import { Account } from '../../../domain/models/account'
import { mockAccounts } from '../../../domain/tests/account/mock-accounts'
import { LoadAccounts } from '../../../domain/usecases/load-accounts'
import { HttpRequest } from '../../protocols/http'

export const mockLoadAccountsRequest = (): HttpRequest => ({
  body: {
    isBarber: true
  }
})

export class LoadAccountsStub implements LoadAccounts {
  async loadAll (params: LoadAccounts.Params): Promise<Account[]> {
    return mockAccounts()
  }
}