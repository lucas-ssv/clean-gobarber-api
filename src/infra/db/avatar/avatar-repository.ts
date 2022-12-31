import { AddAvatarRepository } from '../../../data/protocols/db/add-avatar-repository'
import { Avatar } from '../../../domain/models/avatar'
import { client } from '../client'

export class AvatarRepository implements AddAvatarRepository {
  async add (params: AddAvatarRepository.Params): Promise<Avatar> {
    const avatar = await client.avatar.create({
      data: {
        name: params.name,
        url: params.url
      }
    })
    return avatar
  }
}