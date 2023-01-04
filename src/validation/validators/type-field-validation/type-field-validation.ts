import { TypeFieldError } from '../../../presentation/errors/type-field-error'
import { Validation } from '../../../presentation/protocols/validation'

export class TypeFieldValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldType: 'string' | 'number' | 'boolean'
  ) {}

  validate (input: object): Error {
    return new TypeFieldError(this.fieldName, this.fieldType)
  }
}