import { Signer } from '../../../data/protocols/criptography/signer'
import jwt from 'jsonwebtoken'
import env from '../../../main/config/env'

export class JwtAdapter implements Signer {
  async sign (value: string): Promise<string> {
    const token = jwt.sign({ id: value }, env.secret, {
      expiresIn: env.expiresIn
    })
    return token
  }
}
