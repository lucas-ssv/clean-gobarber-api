import { DbLoadAccounts } from '../../../../data/usecases/load-accounts/db-load-accounts'
import { LoadAccounts } from '../../../../domain/usecases/load-accounts'
import { AccountRepository } from '../../../../infra/db/account/account-repository'

export const makeLoadAccounts = (): LoadAccounts => {
  const accountRepository = new AccountRepository()
  return new DbLoadAccounts(accountRepository)
}