import { Encrypter } from '../../../data/protocols/encrypt/encrypter'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  async hash (text: string): Promise<string> {
    const salt = 12
    const hash = await bcrypt.hash(text, salt)
    return hash
  }
}
