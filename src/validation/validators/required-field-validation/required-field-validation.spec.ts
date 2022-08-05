import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamError } from '../../../presentation/errors/missing-param-error'

const makeSut = (fieldName: string): RequiredFieldValidation => new RequiredFieldValidation(fieldName)

describe('RequiredFieldValidation', () => {
  test('Should return MissingParamError if field is empty', () => {
    const fieldName = 'any_field'
    const sut = makeSut(fieldName)
    const error = sut.validate({ any_field: '' })
    expect(error).toEqual(new MissingParamError(fieldName))
  })
})
