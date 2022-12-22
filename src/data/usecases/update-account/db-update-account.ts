import { Account } from '../../../domain/models/account'
import { UpdateAccount } from '../../../domain/usecases/update-account'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'

export class DbUpdateAccount implements UpdateAccount {
  constructor (private readonly loadByEmailRepository: LoadByEmailRepository<Account>) {}

  async update (params: UpdateAccount.Params): Promise<void> {
    await this.loadByEmailRepository.loadByEmail(params.email)
  }
}