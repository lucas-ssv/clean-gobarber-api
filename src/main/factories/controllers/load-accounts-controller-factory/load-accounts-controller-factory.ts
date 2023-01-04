import { LoadAccountsController } from '../../../../presentation/controllers/account/load-accounts/load-accounts-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { makeLoadAccounts } from '../../usecases/load-accounts/db-load-accounts'
import { makeLoadAccountsValidations } from './load-accounts-validations'

export const makeLoadAccountsController = (): Controller => {
  return new LoadAccountsController(makeLoadAccountsValidations(), makeLoadAccounts())
}