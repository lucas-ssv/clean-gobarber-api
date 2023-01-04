import { Account } from '../models/account'

export interface LoadAccounts {
  loadAll: (isBarber: boolean) => Promise<Account[]>
}