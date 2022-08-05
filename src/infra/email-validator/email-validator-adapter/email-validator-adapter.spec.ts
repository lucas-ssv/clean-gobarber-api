import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

describe('EmailValidatorAdapter', () => {
  test('Should call EmailValidatorAdapter with correct value', () => {
    const validatorSpy = jest.spyOn(validator, 'isEmail')
    const sut = new EmailValidatorAdapter()
    sut.isValid('any_email')
    expect(validatorSpy).toHaveBeenCalledWith('any_email')
  })
})
