import { LoadAccountsController } from './load-accounts-controller'
import { ValidationStub } from '../../../tests/mock-validation'
import { Validation } from '../../../protocols/validation'
import { mockLoadAccountsRequest } from '../../../tests/account/mock-load-accounts'
import { badRequest } from '../../../helpers/http/http-helper'

type SutTypes = {
  sut: LoadAccountsController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const sut = new LoadAccountsController(validationStub)
  return {
    sut,
    validationStub
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
})