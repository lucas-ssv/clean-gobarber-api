import { Signer } from '../../protocols/criptography/signer'

export class SignerStub implements Signer {
  async sign (params: Signer.Params): Promise<string> {
    return await Promise.resolve('any_token')
  }
}