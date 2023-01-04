import { Account } from '../../../domain/models/account'
import { LoadAccounts } from '../../../domain/usecases/load-accounts'

export interface LoadAccountsRepository {
  loadAll: (params: LoadAccountsRepository.Params) => Promise<LoadAccountsRepository.Result>
}

export namespace LoadAccountsRepository {
  export type Params = LoadAccounts.Params
  export type Result = Account[]
}