import { AccountModel } from '../../domain/models/account'
import { AddAccountParams } from '../../domain/usecases/add-account'
import { AddAccountRepository } from '../protocols/db/add-account-repository'

export const mockFakeAddAccountRequest = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  isBarber: false
})

export class AddAccountRepositoryStub implements AddAccountRepository {
  async add (account: AddAccountParams): Promise<AccountModel> {
    return await Promise.resolve({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password',
      isBarber: false
    })
  }
}
