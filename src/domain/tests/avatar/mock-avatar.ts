import { Avatar } from '../../models/avatar'
import { AddAvatar } from '../../usecases/add-avatar'

export const mockAddAvatarParams = (): AddAvatar.Params => ({
  email: 'any_email@mail.com',
  name: 'any_name',
  url: 'any_url'
})

export const mockAddAvatarResult = (): Avatar => ({
  id: 'any_avatar_id',
  name: 'any_name',
  url: 'any_url'
})