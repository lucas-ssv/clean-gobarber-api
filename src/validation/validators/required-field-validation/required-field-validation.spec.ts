import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamError } from '../../../presentation/errors/missing-param-error'

const makeSut = (fieldName: string): RequiredFieldValidation => new RequiredFieldValidation(fieldName)

describe('RequiredFieldValidation', () => {
  test('Should return MissingParamError if field is empty', () => {
    const fieldName = 'any_field'
    const sut = makeSut(fieldName)
    const error = sut.validate({ [fieldName]: '' })
    expect(error).toEqual(new MissingParamError(fieldName))
  })

  test('Should return null if there is no error', () => {
    const fieldName = 'any_field'
    const sut = makeSut(fieldName)
    const error = sut.validate({ [fieldName]: 'any_value' })
    expect(error).toBeNull()
  })

  test('Should return null if field has typeof boolean', () => {
    const fieldName = 'any_field'
    const input = { [fieldName]: false }
    const sut = makeSut(fieldName)
    const error = sut.validate(input)
    expect(typeof input[fieldName]).toBe('boolean')
    expect(error).toBeNull()
  })
})
