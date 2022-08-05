export class CompareFieldsError extends Error {
  constructor (field: string, fieldToCompare: string) {
    super(`${field} and ${fieldToCompare} have to be the same`)
    this.name = 'CompareFieldsError'
  }
}
