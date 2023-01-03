import { Account } from '../models/account'

export interface UpdateAccount {
  update: (params: UpdateAccount.Params) => Promise<UpdateAccount.Result>
}

export namespace UpdateAccount {
  export type Params = {
    id: string
    name?: string
    currentPassword?: string
    newPassword?: string
    avatarId?: string
  }

  export type Result = Account
}