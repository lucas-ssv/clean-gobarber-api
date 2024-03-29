import { LoadAccount } from '../../../domain/usecases/load-account'
import { LoadAccountRepository } from '../../protocols/db/load-account-repository'

export class DbLoadAccount implements LoadAccount {
  constructor (private readonly loadAccountRepository: LoadAccountRepository) {}

  async load (id: string): Promise<LoadAccount.Result> {
    const account = await this.loadAccountRepository.load(id)
    if (account) {
      return account
    }
    return null as any
  }
}