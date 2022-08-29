import { LoginController } from './login-controller'
import { AuthenticationStub } from '../../../test/account/mock-authentication'

describe('LoginController', () => {
  test('Should call Authentication with correct values', async () => {
    const authenticationStub = new AuthenticationStub()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const sut = new LoginController(authenticationStub)
    await sut.handle({
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    })
    expect(authSpy).toHaveBeenCalledWith('any_email@mail.com', 'any_password')
  })
})
