import { Account } from '../../../domain/models/account';
import { AccountParams, AddAccount } from '../../../domain/usecases/add-account'
import { Encrypter } from '../../protocols/criptography/encrypter';
import { AddAccountRepository } from '../../protocols/db/add-account-repository';

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (account: AccountParams): Promise<Account> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    const accountData = await this.addAccountRepository.add({
      ...account,
      password: hashedPassword
    })
    return accountData
  }
}