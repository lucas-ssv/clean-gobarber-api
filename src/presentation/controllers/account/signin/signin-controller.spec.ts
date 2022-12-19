import { SignInController } from './signin-controller'
import { mockSignInRequest } from '../../../tests/account/mock-add-account'
import { ValidationStub } from '../../../tests/mock-validation'
import { Validation } from '../../../protocols/validation'
import { badRequest } from '../../../helpers/http/http-helper'

type SutTypes = {
  sut: SignInController,
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const sut = new SignInController(validationStub)
  return {
    sut,
    validationStub
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
})