import { EmailValidatorAdapter } from '../../../../../infra/email-validator/email-validator-adapter/email-validator-adapter'
import { Validation } from '../../../../../presentation/protocols/validation'
import { EmailValidation } from '../../../../../validation/validators/email-validation/email-validation'
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation/required-field-validation'
import { ValidationComposite } from '../../../../../validation/validators/validation-composite/validation-composite'
import { makeLoginValidation } from './login-validations'

jest.mock('../../../../../validation/validators/validation-composite/validation-composite')

describe('LoginValidations', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const fieldName of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(fieldName))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
