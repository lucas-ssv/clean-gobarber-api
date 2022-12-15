export class EmailInUseError extends Error {
  constructor () {
    super('E-mail provided is already exists!')
    this.name = 'EmailInUseError'
  }
}