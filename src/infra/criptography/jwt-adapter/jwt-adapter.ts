import { GenerateToken } from '../../../data/protocols/criptography/generate-token'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements GenerateToken {
  generate (value: string): string {
    jwt.sign({ id: value }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    })
    return null
  }
}
