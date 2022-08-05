import { EmailValidation } from './email-validation'
import { EmailValidatorStub } from '../../../presentation/test/validation/mock-email-validation'
import { EmailValidator } from '../../protocols/email-validator'
import { InvalidEmailError } from '../../../presentation/errors/invalid-email-error'

type SutTypes = {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new EmailValidation('any_email', emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('EmailValidation', () => {
  test('Should call EmailValidator with correct value', () => {
    const { sut, emailValidatorStub } = makeSut()
    const validSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ any_email: 'any_value' })
    expect(validSpy).toHaveBeenCalledWith('any_value')
  })

  test('Should return an error if email is not valid', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ any_email: 'any_value' })
    expect(error).toEqual(new InvalidEmailError())
  })
})
