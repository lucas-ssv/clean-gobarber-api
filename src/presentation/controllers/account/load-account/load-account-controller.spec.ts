import { LoadAccountController } from './load-account-controller'
import { ValidationStub } from '../../../tests/mock-validation'
import { mockLoadAccountRequest } from '../../../tests/account/mock-load-account'
import { Validation } from '../../../protocols/validation'
import { badRequest, notFound, ok, serverError } from '../../../helpers/http/http-helper'
import { LoadByEmailStub } from '../../../tests/account/mock-load-by-email'
import { LoadByEmail } from '../../../../domain/usecases/load-by-email'
import { Account } from '../../../../domain/models/account'
import { InvalidAccountError } from '../../../errors/invalid-account-error'
import { mockAccount } from '../../../../domain/tests/account/mock-account'

type SutTypes = {
  sut: LoadAccountController
  validationStub: Validation
  loadByEmailStub: LoadByEmail<Account>
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const loadByEmailStub = new LoadByEmailStub()
  const sut = new LoadAccountController(validationStub, loadByEmailStub)
  return {
    sut,
    validationStub,
    loadByEmailStub
  }
}

describe('LoadAccountController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const mockRequest = mockLoadAccountRequest()
    await sut.handle(mockRequest)
    expect(validationSpy).toHaveBeenCalledWith(mockRequest.body)
  })

  test('Should return 400 if any validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockLoadAccountRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call LoadByEmail with correct value', async () => {
    const { sut, loadByEmailStub } = makeSut()
    const loadSpy = jest.spyOn(loadByEmailStub, 'loadByEmail')
    await sut.handle(mockLoadAccountRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return 404 if no account was found', async () => {
    const { sut, loadByEmailStub } = makeSut()
    jest.spyOn(loadByEmailStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null) as any)
    const httpResponse = await sut.handle(mockLoadAccountRequest())
    expect(httpResponse).toEqual(notFound(new InvalidAccountError()))
  })

  test('Should return 200 if LoadByEmail succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockLoadAccountRequest())
    expect(httpResponse).toEqual(ok(mockAccount()))
  })

  test('Should return 500 if LoadByEmail throws', async () => {
    const { sut, loadByEmailStub } = makeSut()
    jest.spyOn(loadByEmailStub, 'loadByEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockLoadAccountRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})