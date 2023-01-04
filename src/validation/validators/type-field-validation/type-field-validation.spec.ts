import { TypeFieldValidation } from './type-field-validation'
import { TypeFieldError } from '../../../presentation/errors/type-field-error'

describe('TypeFieldValidation', () => {
  test('Should return TypeFieldError if type field is different than provided', () => {
    const fieldName = 'any_field'
    const fieldType = 'boolean'
    const sut = new TypeFieldValidation(fieldName, fieldType)
    const error = sut.validate({ [fieldName]: 'any_value' })
    expect(error).toEqual(new TypeFieldError(fieldName, fieldType))
  })

  test('Should return null if type field satisfies the provided', () => {
    const fieldName = 'any_field'
    const fieldType = 'boolean'
    const sut = new TypeFieldValidation(fieldName, fieldType)
    const error = sut.validate({ [fieldName]: false })
    expect(error).toBeNull()
  })
})