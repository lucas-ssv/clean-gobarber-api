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

  test('Should return true if is a valid email', () => {
    const sut = makeSut()
    const isValidEmail = sut.isValid('any_email@mail.com')
    expect(isValidEmail).toBeTruthy()
  })

  test('Should return false if is an invalid email', () => {
    const sut = makeSut()
    const isValidEmail = sut.isValid('invalid_email')
    expect(isValidEmail).toBeFalsy()
  })
})
