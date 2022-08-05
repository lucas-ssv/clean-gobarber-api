import { ValidationComposite } from './validation-composite'
import { EmailValidatorAdapter } from '../../../infra/email-validator/email-validator-adapter/email-validator-adapter'
import { MissingParamError } from '../../../presentation/errors/missing-param-error'
import { EmailValidation } from '../email-validation/email-validation'
import { RequiredFieldValidation } from '../required-field-validation/required-field-validation'

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const sut = new ValidationComposite([
      new RequiredFieldValidation('any_field'),
      new EmailValidation('any_email', new EmailValidatorAdapter())
    ])
    const error = sut.validate({ any_email: 'any_email@mail.com' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })
})
