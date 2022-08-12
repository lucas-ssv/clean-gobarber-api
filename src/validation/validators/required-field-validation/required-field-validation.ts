import { MissingParamError } from '../../../presentation/errors/missing-param-error'
import { Validation } from '../../../presentation/protocols/validation'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: object): Error {
    if (typeof input[this.fieldName] === 'boolean') {
      return null
    }
    return input[this.fieldName] ? null : new MissingParamError(this.fieldName)
  }
}
