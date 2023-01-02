import { DbAddAvatar } from '../../../../data/usecases/add-avatar/db-add-avatar'
import { AccountRepository } from '../../../../infra/db/account/account-repository'
import { AvatarRepository } from '../../../../infra/db/avatar/avatar-repository'
import { AddAvatarController } from '../../../../presentation/controllers/avatar/add-avatar-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { Validation } from '../../../../presentation/protocols/validation'
import { EmailValidation } from '../../../../validation/validators/email-validation/email-validation'
import { RequiredFieldValidation } from '../../../../validation/validators/required-field-validation/required-field-validation'
import { ValidationComposite } from '../../../../validation/validators/validation-composite/validation-composite'

export const makeAddAvatarController = (): Controller => {
  const validations: Validation[] = []
  for (const fieldName of ['email', 'name', 'url']) {
    validations.push(new RequiredFieldValidation(fieldName))
  }
  validations.push(new EmailValidation('email'))
  const accountRepository = new AccountRepository()
  const avatarRepository = new AvatarRepository()
  const addAvatar = new DbAddAvatar(accountRepository, avatarRepository, accountRepository)
  return new AddAvatarController(new ValidationComposite(validations), addAvatar)
}