import { mockAddAvatarResult } from '../../../domain/tests/avatar/mock-avatar'
import { AddAvatar } from '../../../domain/usecases/add-avatar'
import { badRequest, ok } from '../../helpers/http/http-helper'
import { Validation } from '../../protocols/validation'
import { AddAvatarStub, mockAvatarRequest } from '../../tests/avatar/mock-add-avatar'
import { ValidationStub } from '../../tests/mock-validation'
import { AddAvatarController } from './add-avatar-controller'

type SutTypes = {
  sut: AddAvatarController
  validationStub: Validation
  addAvatarStub: AddAvatar
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const addAvatarStub = new AddAvatarStub()
  const sut = new AddAvatarController(validationStub, addAvatarStub)
  return {
    sut,
    validationStub,
    addAvatarStub
  }
}

describe('AddAvatarController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockAvatarRequest())
    expect(validationSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      name: 'any_name',
      url: 'any_url'
    })
  })
  
  test('Should return 400 if any validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockAvatarRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddAvatar with correct values', async () => {
    const { sut, addAvatarStub } = makeSut()
    const addSpy = jest.spyOn(addAvatarStub, 'add')
    await sut.handle(mockAvatarRequest())
    expect(addSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      name: 'any_name',
      url: 'any_url'
    })
  })

  test('Should return 200 if AddAvatar succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockAvatarRequest())
    expect(httpResponse).toEqual(ok(mockAddAvatarResult()))
  })
})