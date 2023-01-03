import { DbLoadByEmail } from '../../../../data/usecases/load-by-email/db-load-by-email'
import { AccountRepository } from '../../../../infra/db/account/account-repository'
import { LoadAccountController } from '../../../../presentation/controllers/account/load-account/load-account-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { Validation } from '../../../../presentation/protocols/validation'
import { EmailValidation } from '../../../../validation/validators/email-validation/email-validation'
import { RequiredFieldValidation } from '../../../../validation/validators/required-field-validation/required-field-validation'
import { ValidationComposite } from '../../../../validation/validators/validation-composite/validation-composite'

export const makeLoadAccountController = (): Controller => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('email'))
  validations.push(new EmailValidation('email'))
  const accountRepository = new AccountRepository()
  const loadByEmail = new DbLoadByEmail(accountRepository)
  return new LoadAccountController(new ValidationComposite(validations), loadByEmail)
}