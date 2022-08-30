import { LoginController } from '../../../../presentation/controllers/account/login/login-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication'
import { makeLoginValidation } from './login-validations/login-validations'

export const makeLoginController = (): Controller => {
  return new LoginController(makeDbAuthentication(), makeLoginValidation())
}
