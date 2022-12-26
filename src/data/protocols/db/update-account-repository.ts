import { UpdateAccount } from '../../../domain/usecases/update-account'

export interface UpdateAccountRepository {
  update: (params: UpdateAccountRepository.Params) => Promise<UpdateAccountRepository.Result>
}

export namespace UpdateAccountRepository {
  export type Params = Omit<UpdateAccount.Params, 'email'>
  export type Result = UpdateAccount.Result
}