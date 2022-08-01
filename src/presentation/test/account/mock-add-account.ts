import { AccountModel } from '../../../domain/models/account'
import { AddAccount, AddAccountParams } from '../../../domain/usecases/add-account'

export class AddAccountStub implements AddAccount {
  async add (account: AddAccountParams): Promise<AccountModel> {
    return {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      isBarber: false,
      createdAt: new Date()
    }
  }
}
