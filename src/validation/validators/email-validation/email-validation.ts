import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidator } from '../../protocols/email-validator'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: object): Error {
    this.emailValidator.isValid(input[this.fieldName])
    return null
  }
}
