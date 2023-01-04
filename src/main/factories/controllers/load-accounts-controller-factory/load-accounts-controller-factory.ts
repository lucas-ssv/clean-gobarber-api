import { DbLoadAccounts } from '../../../../data/usecases/load-accounts/db-load-accounts'
import { AccountRepository } from '../../../../infra/db/account/account-repository'
import { LoadAccountsController } from '../../../../presentation/controllers/account/load-accounts/load-accounts-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { Validation } from '../../../../presentation/protocols/validation'
import { RequiredFieldValidation } from '../../../../validation/validators/required-field-validation/required-field-validation'
import { ValidationComposite } from '../../../../validation/validators/validation-composite/validation-composite'

export const makeLoadAccountsController = (): Controller => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('isBarber'))
  const accountRepository = new AccountRepository()
  const loadAccounts = new DbLoadAccounts(accountRepository)
  return new LoadAccountsController(new ValidationComposite(validations), loadAccounts)
}