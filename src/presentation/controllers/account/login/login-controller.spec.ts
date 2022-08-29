import { LoginController } from './login-controller'
import { AuthenticationStub } from '../../../test/account/mock-authentication'
import { Authentication } from '../../../../domain/usecases/authentication'
import { ValidationStub } from '../../../test/validation/mock-validation'
import { Validation } from '../../../protocols/validation'
import { mockLoginRequest } from '../../../test/account/mock-login-request'
import { badRequest, ok, serverError, unauthorized } from '../../../helpers/http/helper'
import { mockAuthAccount } from '../../../test/account/mock-auth-account'

type SutTypes = {
  sut: LoginController
  authenticationStub: Authentication
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const authenticationStub = new AuthenticationStub()
  const validationStub = new ValidationStub()
  const sut = new LoginController(authenticationStub, validationStub)
  return {
    sut,
    authenticationStub,
    validationStub
  }
}

describe('LoginController', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockLoginRequest())
    expect(authSpy).toHaveBeenCalledWith('any_email@mail.com', 'any_password')
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockLoginRequest()
    await sut.handle(httpRequest)
    expect(validSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockLoginRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should return 401 if Authentication fails', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(mockLoginRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 200 if Authentication succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockLoginRequest())
    expect(httpResponse).toEqual(ok(mockAuthAccount()))
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockLoginRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
