import { CompareFieldsError } from '../../../presentation/errors/compare-fields-error'
import { CompareFieldsValidation } from './compare-fields-validation'

describe('CompareFieldsValidation', () => {
  test('Should return a CompareFieldsError if the fields are not equals', () => {
    const fieldName = 'field'
    const fieldNameToCompare = 'fieldToCompare'
    const sut = new CompareFieldsValidation(fieldName, fieldNameToCompare)
    const error = sut.validate({ [fieldName]: 'any_value', [fieldNameToCompare]: 'other_value' })
    expect(error).toEqual(new CompareFieldsError(fieldName, fieldNameToCompare))
  })
  
  test('Should return null if comparation fields succeeds', () => {
    const sut = new CompareFieldsValidation('field', 'fieldToCompare')
    const error = sut.validate({ field: 'any_field', fieldToCompare: 'any_field' })
    expect(error).toBeNull()
  })
})