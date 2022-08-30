import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { Authentication } from '../../../../domain/usecases/authentication'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountRepository } from '../../../../infra/db/account/account-repository'
import { makeDbLoadByEmail } from '../load-by-email/db-load-by-email-factory'

export const makeDbAuthentication = (): Authentication => {
  const bcryptAdapter = new BcryptAdapter()
  const jwtAdapter = new JwtAdapter()
  const accountRepository = new AccountRepository()
  return new DbAuthentication(makeDbLoadByEmail(), bcryptAdapter, jwtAdapter, accountRepository)
}
