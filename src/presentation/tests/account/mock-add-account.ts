import { AccountParams, AddAccount } from '../../../domain/usecases/add-account'

export class AddAccountStub implements AddAccount {
  async add (account: AccountParams): Promise<void> {}
}