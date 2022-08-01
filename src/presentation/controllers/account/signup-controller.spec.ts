import { SignUpController } from './signup-controller'
import { AddAccountStub } from '../../test/account/mock-add-account'
import { mockFakeAddAccountRequest } from '../../test/account/mock-fake-add-account-request'

describe('SignUpController', () => {
  test('Should call AddAccount with correct values', async () => {
    const addAccountStub = new AddAccountStub()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    const sut = new SignUpController(addAccountStub)
    await sut.handle(mockFakeAddAccountRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      isBarber: false
    })
  })
})
