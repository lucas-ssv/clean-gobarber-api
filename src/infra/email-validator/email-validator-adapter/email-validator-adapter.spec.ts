import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

const makeSut = (): EmailValidatorAdapter => new EmailValidatorAdapter()

describe('EmailValidatorAdapter', () => {
  test('Should call EmailValidatorAdapter with correct value', () => {
    const sut = makeSut()
    const validatorSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email')
    expect(validatorSpy).toHaveBeenCalledWith('any_email')
  })

  test('Should return success if is a valid email', () => {
    const sut = makeSut()
    const isValidEmail = sut.isValid('any_email@mail.com')
    expect(isValidEmail).toBeTruthy()
  })
})
