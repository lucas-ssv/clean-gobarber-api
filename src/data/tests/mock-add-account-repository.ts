import { AccountModel } from '../../domain/models/account'
import { AddAccountParams } from '../../domain/usecases/add-account'
import { AddAccountRepository } from '../protocols/add-account-repository'

export const mockFakeAddAccountRequest = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  passwordConfirmation: 'any_password'
})

export class AddAccountRepositoryStub implements AddAccountRepository {
  async add (account: AddAccountParams): Promise<AccountModel> {
    return await Promise.resolve({
      name: 'any_name',
      token: 'any_token'
    })
  }
}
