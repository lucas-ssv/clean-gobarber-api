import { AddAccountRepository } from '../../../data/protocols/db/add-account-repository'
import { LoadByEmailRepository } from '../../../data/protocols/db/load-by-email-repository'
import { RefreshTokenRepository } from '../../../data/protocols/db/refresh-token-repository'
import { AccountModel } from '../../../domain/models/account'
import { AddAccountParams } from '../../../domain/usecases/add-account'
import { Account } from '../database/entities/account'
import { DbHelper } from '../helpers/db-helper'

export class AccountRepository implements AddAccountRepository, LoadByEmailRepository, RefreshTokenRepository {
  async add (account: AddAccountParams): Promise<AccountModel> {
    const repo = await DbHelper.getRepository(Account)
    const result = await repo.insert(account as any)
    const accountData = await repo.findOne({ where: { id: result.identifiers[0].id } })
    return accountData as AccountModel
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const repo = await DbHelper.getRepository(Account)
    const accountData = await repo.findOne({ where: { email } })
    return accountData as AccountModel
  }

  async refreshToken (id: string, token: string): Promise<void> {
    const repo = await DbHelper.getRepository(Account)
    await repo.createQueryBuilder()
      .update(Account)
      .set({ accessToken: token })
      .where('id = :id', { id })
      .execute()
  }
}
