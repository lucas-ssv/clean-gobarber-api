import { Compare } from '../../../data/protocols/encrypt/compare'
import { Encrypter } from '../../../data/protocols/encrypt/encrypter'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter, Compare {
  async hash (text: string): Promise<string> {
    const salt = 12
    const hash = await bcrypt.hash(text, salt)
    return hash
  }

  async compare (data: string, dataToCompare: string): Promise<boolean> {
    await bcrypt.compare(data, dataToCompare)
    return null
  }
}
