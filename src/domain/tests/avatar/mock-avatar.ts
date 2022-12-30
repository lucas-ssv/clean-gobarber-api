import { AddAvatar } from '../../usecases/add-avatar'

export const mockAddAvatarParams = (): AddAvatar.Params => ({
  email: 'any_email@mail.com',
  name: 'any_name',
  url: 'any_url'
})