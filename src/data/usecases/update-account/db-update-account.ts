import { Account } from '../../../domain/models/account'
import { UpdateAccount } from '../../../domain/usecases/update-account'
import { Compare } from '../../protocols/criptography/compare'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'
import { UpdateAccountRepository } from '../../protocols/db/update-account-repository'

export class DbUpdateAccount implements UpdateAccount {
  constructor (
    private readonly loadByEmailRepository: LoadByEmailRepository<Account>,
    private readonly compare: Compare,
    private readonly updateAccountRepository: UpdateAccountRepository
  ) {}

  async update (params: UpdateAccount.Params): Promise<UpdateAccount.Result> {
    const account = await this.loadByEmailRepository.loadByEmail(params.email)
    if (account) {
      const isPasswordMatch = await this.compare.compare(params.currentPassword, account.password)
      if (isPasswordMatch) {
        const account = await this.updateAccountRepository.update({
          name: params.name,
          email: params.email,
          currentPassword: params.currentPassword,
          newPassword: params.newPassword,
          newPasswordConfirmation: params.newPasswordConfirmation
        })
        return account
      }
    }
    return null as any
  }
}