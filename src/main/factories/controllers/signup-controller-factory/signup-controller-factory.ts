import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountRepository } from '../../../../infra/db/account/account-repository'
import { EmailValidatorAdapter } from '../../../../infra/email-validator/email-validator-adapter/email-validator-adapter'
import { SignUpController } from '../../../../presentation/controllers/account/signup-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { Validation } from '../../../../presentation/protocols/validation'
import { CompareFieldsValidation } from '../../../../validation/validators/compare-fields-validation/compare-fields-validation'
import { EmailValidation } from '../../../../validation/validators/email-validation/email-validation'
import { RequiredFieldValidation } from '../../../../validation/validators/required-field-validation/required-field-validation'
import { ValidationComposite } from '../../../../validation/validators/validation-composite/validation-composite'

export const makeSignUpController = (): Controller => {
  const addAccountRepository = new AccountRepository()
  const encrypter = new BcryptAdapter()
  const addAccount = new DbAddAccount(addAccountRepository, encrypter)
  const validations: Validation[] = []
  for (const fieldName of ['name', 'email', 'password', 'passwordConfirmation', 'isBarber']) {
    validations.push(new RequiredFieldValidation(fieldName))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  const validation = new ValidationComposite(validations)
  const signUpController = new SignUpController(addAccount, validation)
  return signUpController
}
