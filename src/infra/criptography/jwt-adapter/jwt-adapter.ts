import { Signer } from '../../../data/protocols/criptography/signer'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Signer {
  sign (value: string): string {
    const token = jwt.sign({ id: value }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    })
    return token
  }
}
