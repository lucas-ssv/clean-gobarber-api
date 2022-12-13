import { RequiredFieldError } from '../../../presentation/errors/required-field-error'
import { Validation } from '../../../presentation/protocols/validation'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: object): Error {
    return input[this.fieldName] ? null as any : new RequiredFieldError(this.fieldName)
  }
}