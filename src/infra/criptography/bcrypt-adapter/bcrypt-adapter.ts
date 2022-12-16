import bcrypt from 'bcrypt'
import { Compare } from '../../../data/protocols/criptography/compare';
import { Encrypter } from "../../../data/protocols/criptography/encrypter";

export class BcryptAdapter implements Encrypter, Compare {
  async encrypt (value: string): Promise<string> {
    const salt = 12
    const hash = await bcrypt.hash(value, salt)
    return hash
  }

  async compare (value: string, valueToCompare: string): Promise<boolean> {
    const isCompareMatch = await bcrypt.compare(value, valueToCompare)
    return isCompareMatch
  }
}