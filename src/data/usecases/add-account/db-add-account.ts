import { Account } from '../../../domain/models/account';
import { AccountParams, AddAccount } from '../../../domain/usecases/add-account'
import { Encrypter } from '../../protocols/criptography/encrypter';
import { AddAccountRepository } from '../../protocols/db/add-account-repository';
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository';

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadByEmailRepository: LoadByEmailRepository
  ) {}

  async add (account: AccountParams): Promise<Account> {
    await this.loadByEmailRepository.loadByEmail(account.email)
    const hashedPassword = await this.encrypter.encrypt(account.password)
    const accountData = await this.addAccountRepository.add({
      ...account,
      password: hashedPassword
    })
    return accountData
  }
}