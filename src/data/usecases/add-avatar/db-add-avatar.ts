import { Account } from '../../../domain/models/account'
import { Avatar } from '../../../domain/models/avatar'
import { AddAvatar } from '../../../domain/usecases/add-avatar'
import { AddAvatarRepository } from '../../protocols/db/add-avatar-repository'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'

export class DbAddAvatar implements AddAvatar {
  constructor (
    private readonly loadByEmailRepository: LoadByEmailRepository<Account>,
    private readonly addAvatarRepository: AddAvatarRepository
  ) {}

  async add (params: AddAvatar.Params): Promise<Avatar> {
    const account = await this.loadByEmailRepository.loadByEmail(params.email)
    if (account) {
      const avatar = await this.addAvatarRepository.add({
        name: params.name,
        url: params.url
      })
      return avatar
    }
    return null as any
  }
}