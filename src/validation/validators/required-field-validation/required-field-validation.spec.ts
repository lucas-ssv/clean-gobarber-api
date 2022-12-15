import { RequiredFieldValidation } from "./required-field-validation"
import { RequiredFieldError } from "../../../presentation/errors/required-field-error"

describe('RequiredFieldValidation', () => {
  test('Should return RequiredFieldError if field is empty', () => {
    const fieldName = 'any_field'
    const sut = new RequiredFieldValidation(fieldName)
    const error = sut.validate({ [fieldName]: '' })
    expect(error).toEqual(new RequiredFieldError(fieldName))
  })

  test('Should return null if there is no error', () => {
    const fieldName = 'any_field'
    const sut = new RequiredFieldValidation(fieldName)
    const error = sut.validate({ [fieldName]: 'any_value' })
    expect(error).toBeNull()
  })

  test('Should return null if field has typeof boolean', () => {
    const fieldName = 'any_field'
    const input = { [fieldName]: false }
    const sut = new RequiredFieldValidation(fieldName)
    const error = sut.validate(input)
    expect(typeof input[fieldName]).toBe('boolean')
    expect(error).toBeNull()
  })
})