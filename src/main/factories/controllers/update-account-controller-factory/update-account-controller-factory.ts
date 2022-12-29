import { UpdateAccountController } from '../../../../presentation/controllers/account/update-account/update-account-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { makeDbUpdateAccount } from '../../usecases/update-account/db-update-account-factory'
import { makeUpdateAccountValidations } from './update-account-validations'

export const makeUpdateAccountController = (): Controller => {
  return new UpdateAccountController(makeUpdateAccountValidations(), makeDbUpdateAccount())
}