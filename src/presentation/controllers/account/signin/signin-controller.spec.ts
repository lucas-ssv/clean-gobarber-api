import { SignInController } from './signin-controller'
import { mockSignInRequest } from '../../../tests/account/mock-add-account'
import { ValidationStub } from '../../../tests/mock-validation'
import { Validation } from '../../../protocols/validation'
import { badRequest, notFound, ok, serverError } from '../../../helpers/http/http-helper'
import { AuthenticationStub, mockAuthAccount } from '../../../tests/account/mock-authentication'
import { Authentication } from '../../../../domain/usecases/authentication'
import { InvalidAccountError } from '../../../errors/invalid-account-error'

type SutTypes = {
  sut: SignInController,
  validationStub: Validation
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationStub = new AuthenticationStub()
  const sut = new SignInController(validationStub, authenticationStub)
  return {
    sut,
    validationStub,
    authenticationStub
  }
}

describe('SignInController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockSignInRequest())
    expect(validationSpy).toHaveBeenCalledWith(mockSignInRequest().body)
  })

  test('Should return an error if any validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockSignInRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockSignInRequest())
    expect(authSpy).toHaveBeenCalledWith(mockSignInRequest().body.email, mockSignInRequest().body.password)
  })

  test('Should return 404 if Authentication returns null', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(null) as any)
    const httpResponse = await sut.handle(mockSignInRequest())
    expect(httpResponse).toEqual(notFound(new InvalidAccountError()))
  })

  test('Should return 200 if Authentication succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockSignInRequest())
    expect(httpResponse).toEqual(ok(mockAuthAccount()))
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockSignInRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})