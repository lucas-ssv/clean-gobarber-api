import { EmailValidation } from './email-validation'
import { EmailValidatorStub } from '../../../presentation/test/validation/mock-email-validation'

describe('EmailValidation', () => {
  test('Should call EmailValidator with correct value', () => {
    const emailValidatorStub = new EmailValidatorStub()
    const validSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const sut = new EmailValidation('any_email', emailValidatorStub)
    sut.validate({ any_email: 'any_value' })
    expect(validSpy).toHaveBeenCalledWith('any_value')
  })
})
