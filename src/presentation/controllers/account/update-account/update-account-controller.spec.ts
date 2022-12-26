import { UpdateAccountController } from './update-account-controller'
import { ValidationStub } from '../../../tests/mock-validation'
import { mockHttpRequestUpdate } from '../../../tests/account/mock-update-account'
import { Validation } from '../../../protocols/validation'

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
})