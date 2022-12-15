export class InvalidEmailError extends Error {
  constructor () {
    super('This e-mail is not valid. Please provide a valid e-mail.')
    this.name = 'InvalidEmailError'
  }
}