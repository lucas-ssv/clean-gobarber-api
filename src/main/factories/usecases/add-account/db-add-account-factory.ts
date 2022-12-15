import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
import { AddAccount } from '../../../../domain/usecases/add-account'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountRepository } from '../../../../infra/db/account/account-repository'

export const makeDbAddAccount = (): AddAccount => {
  const encrypter = new BcryptAdapter()
  const accountRepository = new AccountRepository()
  return new DbAddAccount(encrypter, accountRepository)
}