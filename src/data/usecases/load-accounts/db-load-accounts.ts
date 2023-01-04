import { Account } from '../../../domain/models/account'
import { LoadAccounts } from '../../../domain/usecases/load-accounts'
import { LoadAccountsRepository } from '../../protocols/db/load-accounts-repository'

export class DbLoadAccounts implements LoadAccounts {
  constructor (private readonly loadAccountsRepository: LoadAccountsRepository) {}

  async loadAll (params: LoadAccounts.Params): Promise<Account[]> {
    await this.loadAccountsRepository.loadAll({ isBarber: params.isBarber })
    return await Promise.resolve(null) as any
  }
}