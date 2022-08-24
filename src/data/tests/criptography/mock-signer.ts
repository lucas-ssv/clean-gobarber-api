import { Signer } from '../../protocols/criptography/signer'

export class GenerateTokenStub implements Signer {
  sign (value: string): string {
    return 'any_token'
  }
}
