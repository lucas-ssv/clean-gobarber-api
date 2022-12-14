import { ValidationComposite } from './validation-composite'
import { InvalidEmailError } from '../../../presentation/errors/invalid-email-error'
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidation } from '../email-validation/email-validation'
import { RequiredFieldValidation } from '../required-field-validation/required-field-validation'
import { MinLengthValidation } from '../min-length-validation/min-length-validation'

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const validations: Validation[] = [
      new EmailValidation('any_email')
    ]
    const sut = new ValidationComposite(validations)
    const error = sut.validate({ any_email: 'any_email' })
    expect(error).toEqual(new InvalidEmailError())
  })

  test('Should return null if validation succeeds', () => {
    const validations: Validation[] = [
      new RequiredFieldValidation('any_field'),
      new EmailValidation('any_email'),
      new MinLengthValidation('any_password', 6)
    ]
    const sut = new ValidationComposite(validations)
    const error = sut.validate({
      any_field: 'any_value',
      any_email: 'any_email@mail.com',
      any_password: '123456'
    })
    expect(error).toBeNull()
  })
})