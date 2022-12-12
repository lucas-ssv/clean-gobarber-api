import { Encrypter } from "../../protocols/criptography/encrypter";

export class EncrypterStub implements Encrypter {
  async encrypt (password: string): Promise<string> {
    return 'hash_password'
  }
}