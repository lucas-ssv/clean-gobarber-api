import { UpdateAccountController } from './update-account-controller'
import { ValidationStub } from '../../../tests/mock-validation'

describe('UpdateAccountController', () => {
  test('Should call Validation with correct values', async () => {
    const mockHttpRequestUpdate = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        currentPassword: 'any_current_password',
        newPassword: 'any_new_password',
        newPasswordConfirmation: 'any_new_password'
      }
    }
    const validationStub = new ValidationStub()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const sut = new UpdateAccountController(validationStub)
    await sut.handle(mockHttpRequestUpdate)
    expect(validationSpy).toHaveBeenCalledWith(mockHttpRequestUpdate.body)
  })
})