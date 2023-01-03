import { DbLoadAccount } from '../../../../data/usecases/load-account/db-load-account'
import { LoadAccount } from '../../../../domain/usecases/load-account'
import { AccountRepository } from '../../../../infra/db/account/account-repository'

export const makeLoadAccount = (): LoadAccount => {
  const accountRepository = new AccountRepository()
  return new DbLoadAccount(accountRepository)
}