import { Encrypter } from '../protocols/criptography/encrypter'

export class EncrypterStub implements Encrypter {
  async hash (text: string): Promise<string> {
    return 'hashed_password'
  }
}
