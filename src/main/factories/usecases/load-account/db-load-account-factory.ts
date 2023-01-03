import { DbLoadByEmail } from '../../../../data/usecases/load-by-email/db-load-by-email'
import { Account } from '../../../../domain/models/account'
import { LoadByEmail } from '../../../../domain/usecases/load-by-email'
import { AccountRepository } from '../../../../infra/db/account/account-repository'

export const makeLoadAccount = (): LoadByEmail<Account> => {
  const accountRepository = new AccountRepository()
  return new DbLoadByEmail(accountRepository)
}