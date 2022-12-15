import { MinLengthValidation } from "./min-length-validation"
import { MinLengthFieldError } from "../../../presentation/errors/min-length-field-error"

describe('MinLengthValidation', () => {
  test('Should return a MinLengthFieldError if field is less than 6', () => {
    const fieldName = 'any_field'
    const length = 6
    const sut = new MinLengthValidation(fieldName, length)
    const error = sut.validate({ [fieldName]: 'any' })
    expect(error).toEqual(new MinLengthFieldError(fieldName, length))
  })

  test('Should return null if field is equal or greater than 6', () => {
    const fieldName = 'any_field'
    const length = 6
    const sut = new MinLengthValidation(fieldName, length)
    const error = sut.validate({ [fieldName]: 'any_field' })
    expect(error).toBeNull()
  })
})