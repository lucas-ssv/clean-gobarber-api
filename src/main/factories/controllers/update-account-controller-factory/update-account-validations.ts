import { Validation } from '../../../../presentation/protocols/validation'
import { CompareFieldsValidation } from '../../../../validation/validators/compare-fields-validation/compare-fields-validation'
import { MinLengthValidation } from '../../../../validation/validators/min-length-validation/min-length-validation'
import { ValidationComposite } from '../../../../validation/validators/validation-composite/validation-composite'

export const makeUpdateAccountValidations = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const fieldName of ['currentPassword', 'newPassword', 'newPasswordConfirmation']) {
    validations.push(new MinLengthValidation(fieldName, 6))
  }
  validations.push(new CompareFieldsValidation('newPassword', 'newPasswordConfirmation'))
  return new ValidationComposite(validations)
}