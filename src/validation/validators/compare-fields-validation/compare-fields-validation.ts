import { CompareFieldsError } from '../../../presentation/errors/compare-fields-error'
import { Validation } from '../../../presentation/protocols/validation'

export class CompareFieldsValidation implements Validation {
  constructor (
    private readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate (input: object): Error {
    if (input[this.field] !== input[this.fieldToCompare]) {
      return new CompareFieldsError(this.field, this.fieldToCompare)
    }
    return null
  }
}
