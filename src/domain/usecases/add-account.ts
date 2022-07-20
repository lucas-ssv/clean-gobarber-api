import { AccountModel } from '../models/account'

export type AddAccountParams = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface AddAccount {
  add: (data: AddAccountParams) => Promise<AccountModel>
}
