import { Avatar } from '../../../domain/models/avatar'
import { mockAddAvatarResult } from '../../../domain/tests/avatar/mock-avatar'
import { AddAvatarRepository } from '../../protocols/db/add-avatar-repository'

export class AddAvatarRepositoryStub implements AddAvatarRepository {
  async add (params: AddAvatarRepository.Params): Promise<Avatar> {
    return mockAddAvatarResult()
  }
}