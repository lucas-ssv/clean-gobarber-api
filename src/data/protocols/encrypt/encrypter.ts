export interface Encrypter {
  hash: (text: string) => Promise<string>
}
