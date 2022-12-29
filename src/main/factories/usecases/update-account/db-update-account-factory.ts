import { DbUpdateAccount } from '../../../../data/usecases/update-account/db-update-account'
import { UpdateAccount } from '../../../../domain/usecases/update-account'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountRepository } from '../../../../infra/db/account/account-repository'

export const makeDbUpdateAccount = (): UpdateAccount => {
  const accountRepository = new AccountRepository()
  const encrypter = new BcryptAdapter()
  const compare = new BcryptAdapter()
  return new DbUpdateAccount(accountRepository, compare, encrypter, accountRepository)
}