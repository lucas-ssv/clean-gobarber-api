import { InvalidEmailError } from '../../../presentation/errors/invalid-email-error'
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidator } from '../../protocols/email-validator'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: object): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidEmailError()
    }
    return null
  }
}
