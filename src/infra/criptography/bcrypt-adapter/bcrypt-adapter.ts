import { Encrypter } from '../../../data/protocols/encrypt/encrypter'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  async hash (text: string): Promise<string> {
    await bcrypt.hash(text, 12)
    return null
  }
}
