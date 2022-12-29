import { UpdateAccountController } from './update-account-controller'
import { UpdateAccount } from '../../../../domain/usecases/update-account'
import { ValidationStub } from '../../../tests/mock-validation'
import { mockHttpRequestUpdate, UpdateAccountStub } from '../../../tests/account/mock-update-account'
import { Validation } from '../../../protocols/validation'
import { badRequest, notFound, ok, serverError } from '../../../helpers/http/http-helper'
import { mockUpdateAccountResult } from '../../../../domain/tests/account/mock-update-account'
import { InvalidAccountError } from '../../../errors/invalid-account-error'
import { RequiredFieldError } from '../../../errors/required-field-error'
import { MinLengthFieldError } from '../../../errors/min-length-field-error'

type SutTypes = {
  sut: UpdateAccountController
  validationStub: Validation
  updateAccountStub: UpdateAccount
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const updateAccountStub = new UpdateAccountStub()
  const sut = new UpdateAccountController(validationStub, updateAccountStub)
  return {
    sut,
    validationStub,
    updateAccountStub
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
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new RequiredFieldError('any_field'))
    const httpResponse = await sut.handle(mockHttpRequestUpdate())
    expect(httpResponse).toEqual(badRequest(new RequiredFieldError('any_field')))
  })

  test('Should return 400 if currentPassword is provided but the validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MinLengthFieldError('currentPassword', 6))
    const httpResponse = await sut.handle({
      body: {
        email: 'any_email@mail.com',
        currentPassword: '123'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MinLengthFieldError('currentPassword', 6)))
  })

  test('Should return 400 if newPassword is provided but the validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MinLengthFieldError('newPassword', 6))
    const httpResponse = await sut.handle({
      body: {
        email: 'any_email@mail.com',
        newPassword: '123'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MinLengthFieldError('newPassword', 6)))
  })

  test('Should call UpdateAccount with correct values', async () => {
    const { sut, updateAccountStub } = makeSut()
    const updateSpy = jest.spyOn(updateAccountStub, 'update')
    await sut.handle(mockHttpRequestUpdate())
    expect(updateSpy).toHaveBeenCalledWith(mockHttpRequestUpdate().body)
  })

  test('Should return 404 if account does not exists', async () => {
    const { sut, updateAccountStub } = makeSut()
    jest.spyOn(updateAccountStub, 'update').mockReturnValueOnce(Promise.resolve(null) as any)
    const httpResponse = await sut.handle(mockHttpRequestUpdate())
    expect(httpResponse).toEqual(notFound(new InvalidAccountError()))
  })

  test('Should return 200 if account was updated on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockHttpRequestUpdate())
    expect(httpResponse).toEqual(ok(mockUpdateAccountResult()))
  })

  test('Should return 500 if UpdateAccount throws', async () => {
    const { sut, updateAccountStub } = makeSut()
    jest.spyOn(updateAccountStub, 'update').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockHttpRequestUpdate())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})