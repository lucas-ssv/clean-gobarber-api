import { CompareFieldsError } from '../../../presentation/errors/compare-fields-error'
import { Validation } from '../../../presentation/protocols/validation'

export class CompareFieldsValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldNameToCompare: string
  ) {}

  validate (input: object): Error {
    return new CompareFieldsError(this.fieldName, this.fieldNameToCompare)
  }
}