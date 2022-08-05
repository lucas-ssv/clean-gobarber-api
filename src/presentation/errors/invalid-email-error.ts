export class InvalidEmailError extends Error {
  constructor () {
    super('The email address provided is invalid.')
    this.name = 'InvalidEmailError'
  }
}
