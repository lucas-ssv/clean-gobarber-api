import { AccountModel } from '../../../domain/models/account'
import { AddAccount, AddAccountParams } from '../../../domain/usecases/add-account'
import { AddAccountRepository } from '../../protocols/db/add-account-repository'
import { Encrypter } from '../../protocols/criptography/encrypter'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly addAccountRepository: AddAccountRepository,
    private readonly encrypter: Encrypter,
    private readonly loadByEmailRepository: LoadByEmailRepository
  ) {}

  async add (account: AddAccountParams): Promise<AccountModel> {
    const emailExists = await this.loadByEmailRepository.loadByEmail(account.email)
    if (!emailExists) {
      const hashedPassword = await this.encrypter.hash(account.password)
      const newAccount = await this.addAccountRepository.add(Object.assign({}, account, { password: hashedPassword }))
      return newAccount
    }
  }
}
