import { Account } from '../../../domain/models/account'

export interface LoadByEmailRepository {
  loadByEmail: (email: string) => Promise<LoadByEmailRepository.Result>
}

export namespace LoadByEmailRepository {
  export type Result = Account
}