import { SignUpController } from './signup-controller'
import { AddAccountStub, mockHttpRequest } from '../../../tests/account/mock-add-account'
import { AddAccount } from '../../../../domain/usecases/add-account'
import { Controller } from '../../../protocols/controller'
import { Validation } from '../../../protocols/validation'
import { ValidationStub } from '../../../tests/mock-validation'
import { badRequest, created } from '../../../helpers/http/http-helper'

type SutTypes = {
  sut: Controller
  addAccountStub: AddAccount
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addAccountStub = new AddAccountStub()
  const validationStub = new ValidationStub()
  const sut = new SignUpController(validationStub, addAccountStub)
  return {
    sut,
    addAccountStub,
    validationStub
  }
}

describe('SignUpController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockHttpRequest())
    expect(validationSpy).toHaveBeenCalledWith(mockHttpRequest().body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockHttpRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(mockHttpRequest())
    expect(addSpy).toHaveBeenCalledWith(mockHttpRequest().body)
  })

  test('Should return 201 if AddAccount succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockHttpRequest())
    expect(httpResponse).toEqual(created())
  })
})