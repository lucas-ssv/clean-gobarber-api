import { Validation } from '../../protocols/validation'
import { mockAvatarRequest } from '../../tests/avatar/mock-add-avatar'
import { ValidationStub } from '../../tests/mock-validation'
import { AddAvatarController } from './add-avatar-controller'

type SutTypes = {
  sut: AddAvatarController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const sut = new AddAvatarController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('AddAvatarController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockAvatarRequest())
    expect(validationSpy).toHaveBeenCalledWith({
      name: 'any_name',
      url: 'any_url'
    })
  })
})