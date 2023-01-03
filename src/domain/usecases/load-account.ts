import { Account } from '../models/account'

export interface LoadAccount {
  load: (id: string) => Promise<LoadAccount.Result>
}

export namespace LoadAccount {
  export type Result = Account
}