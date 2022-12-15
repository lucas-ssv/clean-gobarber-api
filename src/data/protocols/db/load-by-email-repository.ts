import { Account } from '../../../domain/models/account'

export interface LoadByEmailRepository<T> {
  loadByEmail: (email: string) => Promise<T>
}