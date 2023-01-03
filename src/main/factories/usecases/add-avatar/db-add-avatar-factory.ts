import { DbAddAvatar } from '../../../../data/usecases/add-avatar/db-add-avatar'
import { AddAvatar } from '../../../../domain/usecases/add-avatar'
import { AccountRepository } from '../../../../infra/db/account/account-repository'
import { AvatarRepository } from '../../../../infra/db/avatar/avatar-repository'

export const makeDbAddAvatar = (): AddAvatar => {
  const accountRepository = new AccountRepository()
  const avatarRepository = new AvatarRepository()
  return new DbAddAvatar(accountRepository, avatarRepository, accountRepository)
}