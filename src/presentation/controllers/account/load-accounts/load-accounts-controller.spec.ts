import { LoadAccountsController } from './load-accounts-controller'
import { ValidationStub } from '../../../tests/mock-validation'
import { Validation } from '../../../protocols/validation'
import { LoadAccountsStub, mockLoadAccountsRequest } from '../../../tests/account/mock-load-accounts'
import { badRequest, ok } from '../../../helpers/http/http-helper'
import { LoadAccounts } from '../../../../domain/usecases/load-accounts'
import { mockAccounts } from '../../../../domain/tests/account/mock-accounts'

type SutTypes = {
  sut: LoadAccountsController
  validationStub: Validation
  loadAccountsStub: LoadAccounts
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const loadAccountsStub = new LoadAccountsStub()
  const sut = new LoadAccountsController(validationStub, loadAccountsStub)
  return {
    sut,
    validationStub,
    loadAccountsStub
  }
}

describe('LoadAccountsController', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const request = mockLoadAccountsRequest()
    await sut.handle(request)
    expect(validationSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return 400 if any validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockLoadAccountsRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call LoadAccounts with correct value', async () => {
    const { sut, loadAccountsStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountsStub, 'loadAll')
    const request = mockLoadAccountsRequest()
    await sut.handle(request)
    expect(loadSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return 200 if LoadAccounts returns a list of accounts', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockLoadAccountsRequest())
    expect(httpResponse).toEqual(ok(mockAccounts()))
  })
})