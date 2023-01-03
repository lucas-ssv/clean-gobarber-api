import { Validation } from '../../../../presentation/protocols/validation'
import { EmailValidation } from '../../../../validation/validators/email-validation/email-validation'
import { RequiredFieldValidation } from '../../../../validation/validators/required-field-validation/required-field-validation'
import { ValidationComposite } from '../../../../validation/validators/validation-composite/validation-composite'

export const makeLoadAccountValidations = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('email'))
  validations.push(new EmailValidation('email'))
  return new ValidationComposite(validations)
}