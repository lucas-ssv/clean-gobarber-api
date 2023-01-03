import { Avatar } from '../../../domain/models/avatar'
import { AddAvatar } from '../../../domain/usecases/add-avatar'
import { AddAvatarRepository } from '../../protocols/db/add-avatar-repository'
import { LoadAccountRepository } from '../../protocols/db/load-account-repository'
import { UpdateAccountRepository } from '../../protocols/db/update-account-repository'

export class DbAddAvatar implements AddAvatar {
  constructor (
    private readonly loadAccountRepository: LoadAccountRepository,
    private readonly addAvatarRepository: AddAvatarRepository,
    private readonly updateAccountRepository: UpdateAccountRepository
  ) {}

  async add (params: AddAvatar.Params): Promise<Avatar> {
    const account = await this.loadAccountRepository.load(params.accountId)
    if (account) {
      const avatar = await this.addAvatarRepository.add({
        name: params.name,
        url: params.url
      })
      await this.updateAccountRepository.update({ id: params.accountId, avatarId: avatar.id })
      return avatar
    }
    return null as any
  }
}