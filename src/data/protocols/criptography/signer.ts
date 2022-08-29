export interface Signer {
  sign: (value: string) => Promise<string>
}
