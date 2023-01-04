export class TypeFieldError extends Error {
  constructor (fieldName: string, fieldType: string) {
    super(`The field ${fieldName} not satisfies the type ${fieldType}.`)
    this.name = 'TypeFieldError'
  }
}