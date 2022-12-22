import { Account } from '../../../domain/models/account'
import { UpdateAccount } from '../../../domain/usecases/update-account'
import { Compare } from '../../protocols/criptography/compare'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'

export class DbUpdateAccount implements UpdateAccount {
  constructor (
    private readonly loadByEmailRepository: LoadByEmailRepository<Account>,
    private readonly compare: Compare
  ) {}

  async update (params: UpdateAccount.Params): Promise<void> {
    const account = await this.loadByEmailRepository.loadByEmail(params.email)
    if (account) {
      await this.compare.compare(params.currentPassword, account.password)
    }
  }
}