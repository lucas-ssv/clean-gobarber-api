import { AccountModel } from '../../../domain/models/account'

export interface LoadByEmailRepository {
  loadByEmail: (email: string) => Promise<AccountModel>
}
