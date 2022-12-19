import { SignInController } from './signin-controller'
import { mockSignInRequest } from '../../../tests/account/mock-add-account'
import { ValidationStub } from '../../../tests/mock-validation'
import { Validation } from '../../../protocols/validation'
import { badRequest } from '../../../helpers/http/http-helper'
import { LoadByEmailStub } from '../../../tests/account/mock-load-by-email'
import { LoadByEmail } from '../../../../domain/usecases/load-by-email'
import { Account } from '../../../../domain/models/account'

type SutTypes = {
  sut: SignInController,
  validationStub: Validation
  loadByEmailStub: LoadByEmail<Account>
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const loadByEmailStub = new LoadByEmailStub()
  const sut = new SignInController(validationStub, loadByEmailStub)
  return {
    sut,
    validationStub,
    loadByEmailStub
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

  test('Should throw if Validation throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.handle(mockSignInRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadByEmail with correct value', async () => {
    const { sut, loadByEmailStub } = makeSut()
    const loadSpy = jest.spyOn(loadByEmailStub, 'loadByEmail')
    await sut.handle(mockSignInRequest())
    expect(loadSpy).toHaveBeenCalledWith(mockSignInRequest().body.email)
  })

  test('Should throw if LoadByEmail throws', async () => {
    const { sut, loadByEmailStub } = makeSut()
    jest.spyOn(loadByEmailStub, 'loadByEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.handle(mockSignInRequest())
    await expect(promise).rejects.toThrow()
  })
})