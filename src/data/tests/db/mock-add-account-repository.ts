import { AccountParams } from "../../../domain/usecases/add-account";
import { AddAccountRepository } from "../../protocols/db/add-account-repository";

export class AddAccountRepositoryStub implements AddAccountRepository {
  async add (account: AccountParams): Promise<void> {
    return await Promise.resolve(null) as any
  }
}