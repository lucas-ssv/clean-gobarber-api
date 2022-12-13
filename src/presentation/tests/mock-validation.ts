import { Validation } from '../protocols/validation'

export class ValidationStub implements Validation {
  validate (input: object): Error {
    return null as any
  }
}