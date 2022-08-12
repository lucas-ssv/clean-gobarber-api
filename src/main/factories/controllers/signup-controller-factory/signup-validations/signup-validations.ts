import { EmailValidatorAdapter } from '../../../../../infra/email-validator/email-validator-adapter/email-validator-adapter'
import { Validation } from '../../../../../presentation/protocols/validation'
import { CompareFieldsValidation } from '../../../../../validation/validators/compare-fields-validation/compare-fields-validation'
import { EmailValidation } from '../../../../../validation/validators/email-validation/email-validation'
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation/required-field-validation'
import { ValidationComposite } from '../../../../../validation/validators/validation-composite/validation-composite'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const fieldName of ['name', 'email', 'password', 'passwordConfirmation', 'isBarber']) {
    validations.push(new RequiredFieldValidation(fieldName))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  return new ValidationComposite(validations)
}
