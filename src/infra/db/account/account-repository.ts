import { AddAccountRepository } from '../../../data/protocols/db/add-account-repository'
import { AccountModel } from '../../../domain/models/account'
import { AddAccountParams } from '../../../domain/usecases/add-account'
import { Account } from '../database/entities/account'
import { DbHelper } from '../helpers/db-helper'

export class AccountRepository implements AddAccountRepository {
  async add (account: AddAccountParams): Promise<AccountModel> {
    const repo = await DbHelper.getRepository(Account)
    const result = await repo.insert(account as any)
    const accountData = await repo.findOne({ where: { id: result.identifiers[0].id } })
    return accountData as AccountModel
  }
}
