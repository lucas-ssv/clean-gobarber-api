export class EmailInUseError extends Error {
  constructor () {
    super('This e-mail address already exists!')
    this.name = 'EmailInUseError'
  }
}
