import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountRepository } from '../../../../infra/db/account/account-repository'
import { SignInController } from '../../../../presentation/controllers/account/signin/signin-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { Validation } from '../../../../presentation/protocols/validation'
import { EmailValidation } from '../../../../validation/validators/email-validation/email-validation'
import { MinLengthValidation } from '../../../../validation/validators/min-length-validation/min-length-validation'
import { RequiredFieldValidation } from '../../../../validation/validators/required-field-validation/required-field-validation'
import { ValidationComposite } from '../../../../validation/validators/validation-composite/validation-composite'

export const makeSignInController = (): Controller => {
  const validations: Validation[] = []
  for (const fieldName of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(fieldName))
  }
  validations.push(new EmailValidation('email'))
  validations.push(new MinLengthValidation('password', 6))
  const accountRepository = new AccountRepository()
  const compare = new BcryptAdapter()
  const signer = new JwtAdapter()
  const authentication = new DbAuthentication(accountRepository, compare, signer)
  return new SignInController(new ValidationComposite(validations), authentication)
}