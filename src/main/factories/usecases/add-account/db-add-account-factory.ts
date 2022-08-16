import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
import { DbLoadByEmail } from '../../../../data/usecases/load-by-email/db-load-by-email'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountRepository } from '../../../../infra/db/account/account-repository'

export const makeDbAddAccount = (): DbAddAccount => {
  const accountRepository = new AccountRepository()
  const encrypter = new BcryptAdapter()
  const loadByEmailRepository = new DbLoadByEmail(accountRepository)
  return new DbAddAccount(accountRepository, encrypter, loadByEmailRepository)
}
