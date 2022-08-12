import { SignUpController } from '../../../../presentation/controllers/account/signup-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { makeDbAddAccount } from '../../usecases/add-account/db-add-account-factory'
import { makeSignUpValidation } from './signup-validations/signup-validations'

export const makeSignUpController = (): Controller => {
  return new SignUpController(makeDbAddAccount(), makeSignUpValidation())
}
