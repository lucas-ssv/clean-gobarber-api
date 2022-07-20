import { AccountModel } from '../../../domain/models/account'
import { AddAccount, AddAccountParams } from '../../../domain/usecases/add-account'
import { AddAccountRepository } from '../../protocols/add-account-repository'

export class DbAddAccount implements AddAccount {
  constructor (private readonly addAccountRepository: AddAccountRepository) {}

  async add (account: AddAccountParams): Promise<AccountModel> {
    await this.addAccountRepository.add(account)
    return null
  }
}
