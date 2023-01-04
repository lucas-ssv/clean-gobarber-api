import { Account } from '../models/account'

export interface LoadAccounts {
  loadAll: (params: LoadAccounts.Params) => Promise<Account[]>
}

export namespace LoadAccounts {
  export type Params = {
    isBarber: boolean
  }
}