import { mockLoadAccount } from '../../../domain/tests/account/mock-load-account'
import { LoadAccount } from '../../../domain/usecases/load-account'
import { HttpRequest } from '../../protocols/http'

export const mockLoadAccountRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  }
})

export class LoadAccountStub implements LoadAccount {
  async load (id: string): Promise<LoadAccount.Result> {
    return mockLoadAccount()
  }
}