import { LoginController } from './login-controller'
import { AuthenticationStub } from '../../../test/account/mock-authentication'
import { Authentication } from '../../../../domain/usecases/authentication'

type SutTypes = {
  sut: LoginController
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const authenticationStub = new AuthenticationStub()
  const sut = new LoginController(authenticationStub)
  return {
    sut,
    authenticationStub
  }
}

describe('LoginController', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle({
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    })
    expect(authSpy).toHaveBeenCalledWith('any_email@mail.com', 'any_password')
  })
})
