import { mockAccount } from '../../../data/tests/db/mock-add-account-repository'
import { Account } from '../../../domain/models/account'
import { AccountParams, AddAccount } from '../../../domain/usecases/add-account'

export const mockHttpRequest = () => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    isBarber: false
  }
})
export class AddAccountStub implements AddAccount {
  async add (account: AccountParams): Promise<Account> {
    return mockAccount()
  }
}