export class InvalidAccountError extends Error {
  constructor () {
    super('This account does not exists.')
    this.name = 'InvalidAccountError'
  }
}