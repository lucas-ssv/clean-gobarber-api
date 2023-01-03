import { Avatar } from '../../models/avatar'
import { AddAvatar } from '../../usecases/add-avatar'

export const mockAddAvatarParams = (): AddAvatar.Params => ({
  name: 'any_name',
  url: 'any_url',
  accountId: 'any_id'
})

export const mockAddAvatarResult = (): Avatar => ({
  id: 'any_avatar_id',
  name: 'any_name',
  url: 'any_url'
})