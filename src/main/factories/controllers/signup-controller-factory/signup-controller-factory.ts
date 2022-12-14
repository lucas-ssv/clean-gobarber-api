import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountRepository } from '../../../../infra/db/account/account-repository'
import { SignUpController } from '../../../../presentation/controllers/account/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { Validation } from '../../../../presentation/protocols/validation'
import { EmailValidation } from '../../../../validation/validators/email-validation/email-validation'
import { MinLengthValidation } from '../../../../validation/validators/min-length-validation/min-length-validation'
import { RequiredFieldValidation } from '../../../../validation/validators/required-field-validation/required-field-validation'
import { ValidationComposite } from '../../../../validation/validators/validation-composite/validation-composite'

export const makeSignUpController = (): Controller => {
  const validations: Validation[] = []
  for (const fieldName of ['name', 'email', 'password']) {
    validations.push(new RequiredFieldValidation(fieldName))
  }
  validations.push(new EmailValidation('email'))
  validations.push(new MinLengthValidation('password', 6))
  const encrypter = new BcryptAdapter()
  const accountRepository = new AccountRepository()
  const addAccount = new DbAddAccount(encrypter, accountRepository)
  return new SignUpController(new ValidationComposite(validations), addAccount)
}