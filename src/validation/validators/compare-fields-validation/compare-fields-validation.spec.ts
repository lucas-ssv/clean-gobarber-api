import { CompareFieldsValidation } from './compare-fields-validation'
import { CompareFieldsError } from '../../../presentation/errors/compare-fields-error'

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare)
}

describe('CompareFieldsValidation', () => {
  test('Should return CompareFieldsError if fields are different', () => {
    const field = 'any_field'
    const fieldToCompare = 'other_field'
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({ [field]: 'any_value', [fieldToCompare]: 'invalid_value' })
    expect(error).toEqual(new CompareFieldsError(field, fieldToCompare))
  })

  test('Should return null if fields are equal', () => {
    const field = 'any_field'
    const fieldToCompare = 'other_field'
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({ [field]: 'any_value', [fieldToCompare]: 'any_value' })
    expect(error).toBeNull()
  })
})
