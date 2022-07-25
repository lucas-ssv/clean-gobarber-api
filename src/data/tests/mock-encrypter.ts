import { Encrypter } from '../protocols/encrypt/encrypter'

export class EncrypterStub implements Encrypter {
  async hash (text: string): Promise<string> {
    return 'hashed_password'
  }
}
