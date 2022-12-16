export interface Signer {
  sign: (params: Signer.Params) => Promise<string>
}

export namespace Signer {
  export type Params = {
    name: string
    email: string
  }
}