import { MissingParamError } from '../../../presentation/errors/missing-param-error'
import { Validation } from '../../../presentation/protocols/validation'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: object): Error {
    return new MissingParamError(this.fieldName)
  }
}
