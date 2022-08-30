import { Signer } from '../../../data/protocols/criptography/signer'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export class JwtAdapter implements Signer {
  async sign (value: string): Promise<string> {
    const token = jwt.sign({ id: value }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    })
    return token
  }
}
