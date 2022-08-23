import { GenerateToken } from '../../protocols/criptography/generate-token'

export class GenerateTokenStub implements GenerateToken {
  generate (value: string): string {
    return 'any_token'
  }
}
