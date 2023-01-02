import { Avatar } from '../../../domain/models/avatar'
import { AddAvatar } from '../../../domain/usecases/add-avatar'
import { mockAddAvatarResult } from '../../../domain/tests/avatar/mock-avatar'
import { HttpRequest } from '../../protocols/http'

export const mockAvatarRequest = (): HttpRequest => ({
  file: {
    path: 'any_destination/any_filename.png'
  },
  body: {
    email: 'any_email@mail.com',
    name: 'any_name',
  }
})

export class AddAvatarStub implements AddAvatar {
  async add (params: AddAvatar.Params): Promise<Avatar> {
    return mockAddAvatarResult()
  }
}