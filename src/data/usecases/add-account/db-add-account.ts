import { AccountParams, AddAccount } from '../../../domain/usecases/add-account'
import { Encrypter } from '../../protocols/criptography/encrypter';
import { AddAccountRepository } from '../../protocols/db/add-account-repository';

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (account: AccountParams): Promise<void> {
    await this.encrypter.encrypt(account.password)
    await this.addAccountRepository.add(account)
    return await Promise.resolve(null) as any
  }
}