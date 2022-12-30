import { Account } from '../../../domain/models/account'
import { Avatar } from '../../../domain/models/avatar'
import { AddAvatar } from '../../../domain/usecases/add-avatar'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'

export class DbAddAvatar implements AddAvatar {
  constructor (private readonly loadByEmailRepository: LoadByEmailRepository<Account>) {}

  async add (params: AddAvatar.Params): Promise<Avatar> {
    await this.loadByEmailRepository.loadByEmail(params.email)
    return null as any
  }
}