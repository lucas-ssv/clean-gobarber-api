import { SignUpController } from '../../../../presentation/controllers/account/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { makeDbAddAccount } from '../../usecases/add-account/db-add-account-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication'
import { makeSignUpValidation } from './signup-validations/signup-validations'

export const makeSignUpController = (): Controller => {
  return new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
}
