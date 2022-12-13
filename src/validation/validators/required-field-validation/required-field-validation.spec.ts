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
})