import { HttpRequest } from '../../protocols/http'

export const mockHttpRequestUpdate = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    currentPassword: 'any_current_password',
    newPassword: 'any_new_password',
    newPasswordConfirmation: 'any_new_password'
  }
})