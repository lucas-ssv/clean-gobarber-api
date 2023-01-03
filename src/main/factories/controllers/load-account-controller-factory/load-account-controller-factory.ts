import { LoadAccountController } from '../../../../presentation/controllers/account/load-account/load-account-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { makeLoadAccount } from '../../usecases/load-account/db-load-account-factory'
import { makeLoadAccountValidations } from './load-account-validations'

export const makeLoadAccountController = (): Controller => {
  return new LoadAccountController(makeLoadAccountValidations(), makeLoadAccount())
}