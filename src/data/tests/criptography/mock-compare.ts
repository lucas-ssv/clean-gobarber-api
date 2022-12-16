import { Compare } from '../../protocols/criptography/compare'

export class CompareStub implements Compare {
  async compare (value: string, valueToCompare: string): Promise<boolean> {
    return await Promise.resolve(true)
  }
}