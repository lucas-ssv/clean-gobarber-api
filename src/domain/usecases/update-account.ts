import { Account } from '../models/account'

export interface UpdateAccount {
  update: (params: UpdateAccount.Params) => Promise<UpdateAccount.Result>
}

export namespace UpdateAccount {
  export type Params = {
    name: string
    email: string
    currentPassword: string
    newPassword: string
    newPasswordConfirmation: string
  }

  export type Result = Account
}