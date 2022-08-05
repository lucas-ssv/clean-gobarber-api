import { CompareFieldsValidation } from './compare-fields-validation'
import { CompareFieldsError } from '../../../presentation/errors/compare-fields-error'

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare)
}

describe('CompareFieldsValidation', () => {
  test('Should return CompareFieldsError if fields are different', () => {
    const sut = makeSut('any_field', 'other_field')
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'invalid_value' })
    expect(error).toEqual(new CompareFieldsError('any_field', 'other_field'))
  })
})
