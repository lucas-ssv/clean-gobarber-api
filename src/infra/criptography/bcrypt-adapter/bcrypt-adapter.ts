import { Compare } from '../../../data/protocols/criptography/compare'
import { Encrypter } from '../../../data/protocols/criptography/encrypter'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter, Compare {
  async hash (data: string): Promise<string> {
    const salt = 12
    const hash = await bcrypt.hash(data, salt)
    return hash
  }

  async compare (data: string, dataToCompare: string): Promise<boolean> {
    const isValidCompare = await bcrypt.compare(data, dataToCompare)
    return isValidCompare
  }
}
