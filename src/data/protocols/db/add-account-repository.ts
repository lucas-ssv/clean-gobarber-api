import { AccountParams } from "../../../domain/usecases/add-account";

export interface AddAccountRepository {
  add: (account: AccountParams) => Promise<void>
}