import { ValidationComposite } from './validation-composite'
import { EmailValidatorAdapter } from '../../../infra/email-validator/email-validator-adapter/email-validator-adapter'
import { MissingParamError } from '../../../presentation/errors/missing-param-error'
import { EmailValidation } from '../email-validation/email-validation'
import { RequiredFieldValidation } from '../required-field-validation/required-field-validation'
import { Validation } from '../../../presentation/protocols/validation'
import { InvalidEmailError } from '../../../presentation/errors/invalid-email-error'

const makeSut = (validations: Validation[]): ValidationComposite => {
  return new ValidationComposite(validations)
}

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const validations: Validation[] = [
      new EmailValidation('any_email', new EmailValidatorAdapter()),
      new RequiredFieldValidation('any_field')
    ]
    const sut = makeSut(validations)
    const error = sut.validate({ any_email: 'any_email@mail.com' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should return the first error if more than one validation fails', () => {
    const validations = [
      new EmailValidation('any_email', new EmailValidatorAdapter()),
      new RequiredFieldValidation('any_field')
    ]
    const sut = makeSut(validations)
    const error = sut.validate({ any_email: 'any_email' })
    expect(error).toEqual(new InvalidEmailError())
  })
})
