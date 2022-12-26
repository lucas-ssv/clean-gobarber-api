export class CompareFieldsError extends Error {
  constructor (field: string, fieldToCompare: string) {
    super(`The field ${field} and the field ${fieldToCompare} are not equals.`)
    this.name = 'CompareFieldsError'
  }
}