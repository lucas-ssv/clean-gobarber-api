import { SignInController } from '../../../../presentation/controllers/account/signin/signin-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeSignInValidations } from './signin-validations'

export const makeSignInController = (): Controller => {
  return new SignInController(makeSignInValidations(), makeDbAuthentication())
}