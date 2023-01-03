import { AddAvatarController } from '../../../../presentation/controllers/avatar/add-avatar-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { makeDbAddAvatar } from '../../usecases/add-avatar/db-add-avatar-factory'
import { makeAvatarValidations } from './avatar-validations'

export const makeAddAvatarController = (): Controller => {
  return new AddAvatarController(makeAvatarValidations(), makeDbAddAvatar())
}