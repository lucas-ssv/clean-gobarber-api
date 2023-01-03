import { UpdateAccount } from '../../../domain/usecases/update-account'
import { Compare } from '../../protocols/criptography/compare'
import { Encrypter } from '../../protocols/criptography/encrypter'
import { LoadAccountRepository } from '../../protocols/db/load-account-repository'
import { UpdateAccountRepository } from '../../protocols/db/update-account-repository'

export class DbUpdateAccount implements UpdateAccount {
  constructor (
    private readonly loadAccountRepository: LoadAccountRepository,
    private readonly compare: Compare,
    private readonly encrypter: Encrypter,
    private readonly updateAccountRepository: UpdateAccountRepository
  ) {}

  async update (params: UpdateAccount.Params): Promise<UpdateAccount.Result> {
    const account = await this.loadAccountRepository.load(params.id)
    if (account) {
      if (!params.currentPassword) {
        const account = await this.updateAccountRepository.update({
          id: params.id,
          name: params.name
        })
        return account
      } else {
        const isPasswordMatch = await this.compare.compare(params.currentPassword, account.password)
        if (isPasswordMatch) {
          const hashedPassword = await this.encrypter.encrypt(params.newPassword as string)
          const account = await this.updateAccountRepository.update({
            id: params.id,
            name: params.name,
            currentPassword: params.currentPassword,
            newPassword: hashedPassword
          })
          return account
        }
      }
    }
    return null as any
  }
}