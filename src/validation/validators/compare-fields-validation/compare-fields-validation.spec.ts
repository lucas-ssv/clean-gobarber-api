import { CompareFieldsValidation } from './compare-fields-validation'
import { CompareFieldsError } from '../../../presentation/errors/compare-fields-error'

describe('CompareFieldsValidation', () => {
  test('Should return CompareFieldsError if fields are different', () => {
    const sut = new CompareFieldsValidation('any_field', 'other_field')
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'invalid_value' })
    expect(error).toEqual(new CompareFieldsError('any_field', 'other_field'))
  })
})
