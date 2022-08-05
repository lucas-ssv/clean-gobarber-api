import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamError } from '../../../presentation/errors/missing-param-error'

describe('RequiredFieldValidation', () => {
  test('Should return MissingParamError if field is empty', () => {
    const sut = new RequiredFieldValidation('any_field')
    const error = sut.validate({ any_field: '' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })
})
