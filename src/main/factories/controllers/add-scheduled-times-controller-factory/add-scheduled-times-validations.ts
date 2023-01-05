import { Validation } from '../../../../presentation/protocols/validation'
import { RequiredFieldValidation } from '../../../../validation/validators/required-field-validation/required-field-validation'
import { ValidationComposite } from '../../../../validation/validators/validation-composite/validation-composite'

export const makeAddScheduledTimesValidations = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const fieldName of ['date', 'time', 'accountId']) {
    validations.push(new RequiredFieldValidation(fieldName))
  }
  return new ValidationComposite(validations)
}