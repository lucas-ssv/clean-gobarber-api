import { Avatar } from '../../../domain/models/avatar'
import { AddAvatar } from '../../../domain/usecases/add-avatar'

export interface AddAvatarRepository {
  add: (params: AddAvatarRepository.Params) => Promise<AddAvatarRepository.Result>
}

export namespace AddAvatarRepository {
  export type Params = Omit<AddAvatar.Params, 'email'>
  export type Result = Avatar
}