import { EmailValidation } from "./email-validation"
import { InvalidEmailError } from "../../../presentation/errors/invalid-email-error"

describe('EmailValidation', () => {
  test('Should return an InvalidEmailError if field is not email', () => {
    const fieldName = 'any_field'
    const sut = new EmailValidation(fieldName)
    const error = sut.validate({ [fieldName]: 'any_email' })
    expect(error).toEqual(new InvalidEmailError())
  })
})