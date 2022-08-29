import { Signer } from '../../protocols/criptography/signer'

export class GenerateTokenStub implements Signer {
  async sign (value: string): Promise<string> {
    return 'any_token'
  }
}
