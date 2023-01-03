import { LoadAccountController } from './load-account-controller'
import { ValidationStub } from '../../../tests/mock-validation'
import { mockLoadAccountRequest } from '../../../tests/account/mock-load-account'
import { Validation } from '../../../protocols/validation'
import { badRequest, notFound } from '../../../helpers/http/http-helper'
import { LoadByEmailStub } from '../../../tests/account/mock-load-by-email'
import { LoadByEmail } from '../../../../domain/usecases/load-by-email'
import { Account } from '../../../../domain/models/account'
import { InvalidAccountError } from '../../../errors/invalid-account-error'

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
})