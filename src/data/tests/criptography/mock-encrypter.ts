import { Encrypter } from "../../protocols/criptography/encrypter";

export class EncrypterStub implements Encrypter {
  async encrypt (value: string): Promise<string> {
    return 'hashed_password'
  }
}