import { mockAddAvatarResult } from '../../../domain/tests/avatar/mock-avatar'
import { AddAvatar } from '../../../domain/usecases/add-avatar'
import { InvalidAccountError } from '../../errors/invalid-account-error'
import { badRequest, notFound, ok, serverError } from '../../helpers/http/http-helper'
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
      url: 'any_destination/any_filename.png'
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
      url: 'any_destination/any_filename.png'
    })
  })

  test('Should return 404 if no account was found', async () => {
    const { sut, addAvatarStub } = makeSut()
    jest.spyOn(addAvatarStub, 'add').mockReturnValueOnce(Promise.resolve(null) as any)
    const httpResponse = await sut.handle(mockAvatarRequest())
    expect(httpResponse).toEqual(notFound(new InvalidAccountError()))
  })

  test('Should return 200 if AddAvatar succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockAvatarRequest())
    expect(httpResponse).toEqual(ok(mockAddAvatarResult()))
  })

  test('Should return 500 if AddAvatar throws', async () => {
    const { sut, addAvatarStub } = makeSut()
    jest.spyOn(addAvatarStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockAvatarRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})