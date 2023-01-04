import { Validation } from '../../../../presentation/protocols/validation'
import { RequiredFieldValidation } from '../../../../validation/validators/required-field-validation/required-field-validation'
import { TypeFieldValidation } from '../../../../validation/validators/type-field-validation/type-field-validation'
import { ValidationComposite } from '../../../../validation/validators/validation-composite/validation-composite'

export const makeLoadAccountsValidations = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('isBarber'))
  validations.push(new TypeFieldValidation('isBarber', 'boolean'))
  return new ValidationComposite(validations)
}