import { Compare } from '../../protocols/criptography/compare'

export class HashCompareStub implements Compare {
  async compare (data: string, dataToCompare: string): Promise<boolean> {
    return true
  }
}
