import { UpdateAccountController } from './update-account-controller'
import { ValidationStub } from '../../../tests/mock-validation'
import { mockHttpRequestUpdate } from '../../../tests/account/mock-update-account'
import { Validation } from '../../../protocols/validation'
import { badRequest } from '../../../helpers/http/http-helper'

type SutTypes = {
  sut: UpdateAccountController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const sut = new UpdateAccountController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('UpdateAccountController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockHttpRequestUpdate())
    expect(validationSpy).toHaveBeenCalledWith(mockHttpRequestUpdate().body)
  })

  test('Should return 400 if any validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockHttpRequestUpdate())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
})