import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountRepository } from '../../../../infra/db/account/account-repository'
import { SignUpController } from '../../../../presentation/controllers/account/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { Validation } from '../../../../presentation/protocols/validation'
import { EmailValidation } from '../../../../validation/validators/email-validation/email-validation'
import { MinLengthValidation } from '../../../../validation/validators/min-length-validation/min-length-validation'
import { RequiredFieldValidation } from '../../../../validation/validators/required-field-validation/required-field-validation'

export const makeSignUpController = (): Controller => {
  let validation: Validation = null as any
  for (const fieldName of ['name', 'email', 'password', 'isBarber']) {
    validation = new RequiredFieldValidation(fieldName)
  }
  validation = new EmailValidation('email')
  validation = new MinLengthValidation('password', 6)
  const encrypter = new BcryptAdapter()
  const accountRepository = new AccountRepository()
  const addAccount = new DbAddAccount(encrypter, accountRepository)
  return new SignUpController(validation, addAccount)
}