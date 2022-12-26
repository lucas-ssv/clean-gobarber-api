import { UpdateAccount } from '../../usecases/update-account'

export const mockUpdateAccountParams = (): UpdateAccount.Params => ({
  name: 'updated_name',
  email: 'any_email@mail.com',
  currentPassword: 'any_current_password',
  newPassword: 'updated_new_password',
  newPasswordConfirmation: 'updated_new_password'
})

export const mockUpdateAccountResult = (): UpdateAccount.Result => ({
  id: 'any_id',
  name: 'updated_name',
  email: 'any_email@mail.com',
  password: 'updated_password',
  isBarber: false
})