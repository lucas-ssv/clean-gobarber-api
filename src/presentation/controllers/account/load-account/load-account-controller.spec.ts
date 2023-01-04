import { LoadAccountController } from './load-account-controller'
import { LoadAccountStub, mockLoadAccountRequest } from '../../../tests/account/mock-load-account'
import { notFound, ok, serverError } from '../../../helpers/http/http-helper'
import { InvalidAccountError } from '../../../errors/invalid-account-error'
import { LoadAccount } from '../../../../domain/usecases/load-account'
import { mockLoadAccount } from '../../../../domain/tests/account/mock-load-account'

type SutTypes = {
  sut: LoadAccountController
  loadAccountStub: LoadAccount
}

const makeSut = (): SutTypes => {
  const loadAccountStub = new LoadAccountStub()
  const sut = new LoadAccountController(loadAccountStub)
  return {
    sut,
    loadAccountStub
  }
}

describe('LoadAccountController', () => {
  test('Should call LoadAccount with correct value', async () => {
    const { sut, loadAccountStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountStub, 'load')
    await sut.handle(mockLoadAccountRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 404 if no account was found', async () => {
    const { sut, loadAccountStub } = makeSut()
    jest.spyOn(loadAccountStub, 'load').mockReturnValueOnce(Promise.resolve(null) as any)
    const httpResponse = await sut.handle(mockLoadAccountRequest())
    expect(httpResponse).toEqual(notFound(new InvalidAccountError()))
  })

  test('Should return 200 if LoadAccount succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockLoadAccountRequest())
    const { password, ...restAccount } = mockLoadAccount()
    expect(httpResponse).toEqual(ok(restAccount))
  })

  test('Should return 500 if LoadAccount throws', async () => {
    const { sut, loadAccountStub } = makeSut()
    jest.spyOn(loadAccountStub, 'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockLoadAccountRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})