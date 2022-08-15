import { AccountModel } from '../models/account'

export interface LoadByEmail {
  loadByEmail: (email: string) => Promise<AccountModel>
}
