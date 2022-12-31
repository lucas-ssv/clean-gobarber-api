import { ValidationStub } from '../../tests/mock-validation'
import { AddAvatarController } from './add-avatar-controller'

describe('AddAvatarController', () => {
  test('Should call Validation with correct values', async () => {
    const validationStub = new ValidationStub()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const sut = new AddAvatarController(validationStub)
    await sut.handle({
      file: {
        name: 'any_name',
        url: 'any_url'
      }
    })
    expect(validationSpy).toHaveBeenCalledWith({
      name: 'any_name',
      url: 'any_url'
    })
  })
})