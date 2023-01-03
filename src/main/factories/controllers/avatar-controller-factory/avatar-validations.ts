import { Validation } from '../../../../presentation/protocols/validation'
import { EmailValidation } from '../../../../validation/validators/email-validation/email-validation'
import { RequiredFieldValidation } from '../../../../validation/validators/required-field-validation/required-field-validation'
import { ValidationComposite } from '../../../../validation/validators/validation-composite/validation-composite'

export const makeAvatarValidations = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const fieldName of ['email', 'name', 'url']) {
    validations.push(new RequiredFieldValidation(fieldName))
  }
  validations.push(new EmailValidation('email'))
  return new ValidationComposite(validations)
}