import { Account } from "../../../domain/models/account";
import { AccountParams } from "../../../domain/usecases/add-account";

export interface AddAccountRepository {
  add: (account: AddAccountRepository.Params) => Promise<AddAccountRepository.Result>
}

export namespace AddAccountRepository {
  export type Params = AccountParams
  export type Result = Account
}