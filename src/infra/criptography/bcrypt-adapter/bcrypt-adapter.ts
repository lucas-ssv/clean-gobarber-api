import bcrypt from 'bcrypt'
import { Encrypter } from "../../../data/protocols/criptography/encrypter";

export class BcryptAdapter implements Encrypter {
  async encrypt (value: string): Promise<string> {
    const salt = 12
    await bcrypt.hash(value, salt)
    return ''
  }
}