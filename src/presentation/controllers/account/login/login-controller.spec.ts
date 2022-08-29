import { LoginController } from './login-controller'
import { AuthenticationStub } from '../../../test/account/mock-authentication'
import { Authentication } from '../../../../domain/usecases/authentication'
import { ValidationStub } from '../../../test/validation/mock-validation'
import { Validation } from '../../../protocols/validation'
import { mockLoginRequest } from '../../../test/account/mock-login-request'
import { badRequest } from '../../../helpers/http/helper'

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
})
