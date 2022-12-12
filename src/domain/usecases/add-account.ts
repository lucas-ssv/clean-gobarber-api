import { Account } from '../models/account'

export interface AddAccount {
  add: (account: AccountParams) => Promise<Account>
}

export type AccountParams = {
  name: string
  email: string
  password: string
  isBarber: boolean
}