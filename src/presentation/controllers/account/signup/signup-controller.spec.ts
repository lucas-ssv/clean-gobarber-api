import { SignUpController } from "./signup-controller"
import { AddAccountStub } from "../../../tests/account/mock-add-account"

describe('SignUpController', () => {
  test('Should call AddAccount with correct values', async () => {
    const mockHttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        isBarber: false
      }
    }
    const addAccountStub = new AddAccountStub()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    const sut = new SignUpController(addAccountStub)
    await sut.handle(mockHttpRequest)
    expect(addSpy).toHaveBeenCalledWith(mockHttpRequest.body)
  })
})