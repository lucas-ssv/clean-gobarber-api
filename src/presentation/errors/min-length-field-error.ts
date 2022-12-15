export class MinLengthFieldError extends Error {
  constructor (fieldName: string, length: number) {
    super(`The field ${fieldName} cannot be less than ${length}`)
    this.name = 'MinLengthFieldError'
  }
}