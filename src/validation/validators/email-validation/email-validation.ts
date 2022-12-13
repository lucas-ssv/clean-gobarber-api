import { InvalidEmailError } from '../../../presentation/errors/invalid-email-error'
import { Validation } from '../../../presentation/protocols/validation'

export class EmailValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: object): Error {
    return new InvalidEmailError()
  }
}