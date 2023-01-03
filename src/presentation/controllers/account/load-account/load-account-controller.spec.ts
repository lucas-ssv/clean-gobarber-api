import { LoadAccountController } from './load-account-controller'
import { ValidationStub } from '../../../tests/mock-validation'
import { mockLoadAccountRequest } from '../../../tests/account/mock-load-account'
import { Validation } from '../../../protocols/validation'
import { badRequest } from '../../../helpers/http/http-helper'

type SutTypes = {
  sut: LoadAccountController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const sut = new LoadAccountController(validationStub)
  return {
    sut,
    validationStub
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
})