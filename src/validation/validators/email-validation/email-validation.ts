import { InvalidEmailError } from '../../../presentation/errors/invalid-email-error'
import { Validation } from '../../../presentation/protocols/validation'

export class EmailValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: object): Error {
    const isValidEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return isValidEmail.test(input[this.fieldName]) ? null as any : new InvalidEmailError()
  }
}