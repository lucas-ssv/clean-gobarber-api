import { TypeFieldValidation } from './type-field-validation'
import { TypeFieldError } from '../../../presentation/errors/type-field-error'

describe('TypeFieldValidation', () => {
  test('Should return TypeFieldError if type field is different than provided', () => {
    const fieldName = 'any_field'
    const fieldType = 'boolean'
    const sut = new TypeFieldValidation(fieldName, fieldType)
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toEqual(new TypeFieldError(fieldName, fieldType))
  })
})