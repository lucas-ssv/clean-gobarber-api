import { DbLoadByEmail } from '../../../../data/usecases/load-by-email/db-load-by-email'
import { LoadByEmail } from '../../../../domain/usecases/load-by-email'
import { AccountRepository } from '../../../../infra/db/account/account-repository'

export const makeDbLoadByEmail = (): LoadByEmail => {
  const accountRepository = new AccountRepository()
  return new DbLoadByEmail(accountRepository)
}
