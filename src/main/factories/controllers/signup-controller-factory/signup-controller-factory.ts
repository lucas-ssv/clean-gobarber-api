import { SignUpController } from '../../../../presentation/controllers/account/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { makeDbAddAccount } from '../../usecases/add-account/db-add-account-factory'
import { makeSignUpValidations } from './signup-validations'

export const makeSignUpController = (): Controller => {
  return new SignUpController(makeSignUpValidations(), makeDbAddAccount())
}