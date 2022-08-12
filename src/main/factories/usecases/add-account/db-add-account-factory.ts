import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountRepository } from '../../../../infra/db/account/account-repository'

export const makeDbAddAccount = (): DbAddAccount => {
  const accountRepository = new AccountRepository()
  const encrypter = new BcryptAdapter()
  return new DbAddAccount(accountRepository, encrypter)
}
