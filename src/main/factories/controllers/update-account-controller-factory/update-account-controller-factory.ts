import { DbUpdateAccount } from '../../../../data/usecases/update-account/db-update-account'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountRepository } from '../../../../infra/db/account/account-repository'
import { UpdateAccountController } from '../../../../presentation/controllers/account/update-account/update-account-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { Validation } from '../../../../presentation/protocols/validation'
import { CompareFieldsValidation } from '../../../../validation/validators/compare-fields-validation/compare-fields-validation'
import { EmailValidation } from '../../../../validation/validators/email-validation/email-validation'
import { MinLengthValidation } from '../../../../validation/validators/min-length-validation/min-length-validation'
import { RequiredFieldValidation } from '../../../../validation/validators/required-field-validation/required-field-validation'
import { ValidationComposite } from '../../../../validation/validators/validation-composite/validation-composite'

export const makeUpdateAccountController = (): Controller => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('email'))
  validations.push(new EmailValidation('email'))
  for (const fieldName of ['currentPassword', 'newPassword', 'newPasswordConfirmation']) {
    validations.push(new MinLengthValidation(fieldName, 6))
  }
  validations.push(new CompareFieldsValidation('newPassword', 'newPasswordConfirmation'))
  const accountRepository = new AccountRepository()
  const encrypter = new BcryptAdapter()
  const compare = new BcryptAdapter()
  const updateAccount = new DbUpdateAccount(accountRepository, compare, encrypter, accountRepository)
  return new UpdateAccountController(new ValidationComposite(validations), updateAccount)
}