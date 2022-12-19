import { Signer } from '../../../data/protocols/criptography/signer'
import env from '../../../main/config/env'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Signer {
  async sign (params: Signer.Params): Promise<string> {
    const token = jwt.sign(params, env.secret || '', {
      expiresIn: env.expiresIn
    })
    return token
  }
}