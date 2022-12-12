import { Account } from '../../../domain/models/account';
import { AccountParams, AddAccount } from '../../../domain/usecases/add-account'
import { AddAccountRepository } from '../../protocols/db/add-account-repository';

export class DbAddAccount implements AddAccount {
  constructor (private readonly addAccountRepository: AddAccountRepository) {}

  async add (account: AccountParams): Promise<Account> {
    await this.addAccountRepository.add(account)
    return await Promise.resolve(null) as any
  }
}