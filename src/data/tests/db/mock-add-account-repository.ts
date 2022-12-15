import { Account } from '../../../domain/models/account'
import { AccountParams } from '../../../domain/usecases/add-account'
import { AddAccountRepository } from '../../protocols/db/add-account-repository'

export const mockAccountParams = (): AccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  isBarber: false
})

export const mockAccount = (): Account => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password',
  isBarber: false
})

export class AddAccountRepositoryStub implements AddAccountRepository {
  async add (account: AccountParams): Promise<Account> {
    return mockAccount()
  }
}