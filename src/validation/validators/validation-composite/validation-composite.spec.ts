import { ValidationComposite } from './validation-composite'
import { InvalidEmailError } from '../../../presentation/errors/invalid-email-error'
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidation } from '../email-validation/email-validation'
import { RequiredFieldValidation } from '../required-field-validation/required-field-validation'

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const validations: Validation[] = [
      new RequiredFieldValidation('any_field'),
      new EmailValidation('any_email')
    ]
    const sut = new ValidationComposite(validations)
    const error = sut.validate({ any_email: 'any_email' })
    expect(error).toEqual(new InvalidEmailError())
  })
})