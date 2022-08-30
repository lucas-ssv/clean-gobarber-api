import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountRepository } from '../../../../infra/db/account/account-repository'
import { LoginController } from '../../../../presentation/controllers/account/login/login-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { makeDbLoadByEmail } from '../../usecases/load-by-email/db-load-by-email-factory'
import { makeLoginValidation } from './login-validations/login-validations'

export const makeLoginController = (): Controller => {
  const accountRepository = new AccountRepository()
  const generateToken = new JwtAdapter()
  const hashCompare = new BcryptAdapter()
  const authentication = new DbAuthentication(makeDbLoadByEmail(), hashCompare, generateToken, accountRepository)
  return new LoginController(authentication, makeLoginValidation())
}
