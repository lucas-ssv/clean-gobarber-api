import { Account } from '../../../domain/models/account'
import { mockUpdateAccountResult } from '../../../domain/tests/account/mock-update-account'
import { UpdateAccount } from '../../../domain/usecases/update-account'
import { HttpRequest } from '../../protocols/http'

export const mockHttpRequestUpdate = (): HttpRequest => ({
  params: {
    id: 'any_id'
  },
  body: {
    name: 'any_name',
    currentPassword: 'any_current_password',
    newPassword: 'any_new_password',
    newPasswordConfirmation: 'any_new_password'
  }
})

export class UpdateAccountStub implements UpdateAccount {
  async update (params: UpdateAccount.Params): Promise<Account> {
    return mockUpdateAccountResult()
  }
}