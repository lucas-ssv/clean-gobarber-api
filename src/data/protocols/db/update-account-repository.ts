import { UpdateAccount } from '../../../domain/usecases/update-account'

export interface UpdateAccountRepository {
  update: (params: UpdateAccountRepository.Params) => Promise<void>
}

export namespace UpdateAccountRepository {
  export type Params = Omit<UpdateAccount.Params, 'email'>
}