import { Validation } from '../../../../presentation/protocols/validation'
import { EmailValidation } from '../../../../validation/validators/email-validation/email-validation'
import { MinLengthValidation } from '../../../../validation/validators/min-length-validation/min-length-validation'
import { RequiredFieldValidation } from '../../../../validation/validators/required-field-validation/required-field-validation'
import { ValidationComposite } from '../../../../validation/validators/validation-composite/validation-composite'

export const makeSignUpValidations = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const fieldName of ['name', 'email', 'password']) {
    validations.push(new RequiredFieldValidation(fieldName))
  }
  validations.push(new EmailValidation('email'))
  validations.push(new MinLengthValidation('password', 6))
  return new ValidationComposite(validations)
}