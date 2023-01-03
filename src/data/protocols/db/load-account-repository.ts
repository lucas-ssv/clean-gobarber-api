import { LoadAccount } from '../../../domain/usecases/load-account'

export interface LoadAccountRepository {
  load: (id: string) => Promise<LoadAccountRepository.Result>
}

export namespace LoadAccountRepository {
  export type Result = LoadAccount.Result
}