import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
import { AddAccount } from '../../../../domain/usecases/add-account'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountRepository } from '../../../../infra/db/account/account-repository'
import { makeDbLoadByEmail } from '../load-by-email/db-load-by-email-factory'

export const makeDbAddAccount = (): AddAccount => {
  const accountRepository = new AccountRepository()
  const encrypter = new BcryptAdapter()
  return new DbAddAccount(accountRepository, encrypter, makeDbLoadByEmail())
}
