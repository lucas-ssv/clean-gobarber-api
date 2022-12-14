import { MinLengthFieldError } from '../../../presentation/errors/min-length-field-error'
import { Validation } from '../../../presentation/protocols/validation'

export class MinLengthValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly length: number
  ) {}

  validate (input: object): Error {
    return input[this.fieldName].length >= this.length ? null as any : new MinLengthFieldError(this.fieldName, this.length)
  }
}