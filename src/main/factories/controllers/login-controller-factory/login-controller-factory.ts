import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountRepository } from '../../../../infra/db/account/account-repository'
import { EmailValidatorAdapter } from '../../../../infra/email-validator/email-validator-adapter/email-validator-adapter'
import { LoginController } from '../../../../presentation/controllers/account/login/login-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { Validation } from '../../../../presentation/protocols/validation'
import { EmailValidation } from '../../../../validation/validators/email-validation/email-validation'
import { RequiredFieldValidation } from '../../../../validation/validators/required-field-validation/required-field-validation'
import { ValidationComposite } from '../../../../validation/validators/validation-composite/validation-composite'
import { makeDbLoadByEmail } from '../../usecases/load-by-email/db-load-by-email-factory'

export const makeLoginController = (): Controller => {
  const accountRepository = new AccountRepository()
  const generateToken = new JwtAdapter()
  const hashCompare = new BcryptAdapter()
  const authentication = new DbAuthentication(makeDbLoadByEmail(), hashCompare, generateToken, accountRepository)
  const validations: Validation[] = []
  for (const fieldName of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(fieldName))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  const validation = new ValidationComposite(validations)
  return new LoginController(authentication, validation)
}
