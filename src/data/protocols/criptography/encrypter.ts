export interface Encrypter {
  hash: (data: string) => Promise<string>
}
