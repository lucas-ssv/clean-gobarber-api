import { SignUpController } from './signup-controller'
import { AddAccountStub } from '../../test/account/mock-add-account'
import { mockFakeAddAccountRequest } from '../../test/account/mock-fake-add-account-request'
import { AddAccount } from '../../../domain/usecases/add-account'
import { Validation } from '../../protocols/validation'
import { ValidationStub } from '../../test/validation/mock-validation'

type SutTypes = {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addAccountStub = new AddAccountStub()
  const validationStub = new ValidationStub()
  const sut = new SignUpController(addAccountStub, validationStub)
  return {
    sut,
    addAccountStub,
    validationStub
  }
}

describe('SignUpController', () => {
  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(null)
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(mockFakeAddAccountRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      isBarber: false
    })
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const fakeAddAccount = mockFakeAddAccountRequest()
    await sut.handle(fakeAddAccount)
    expect(validationSpy).toHaveBeenCalledWith(fakeAddAccount.body)
  })

  test('Should return 400 if validation returns an error', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockFakeAddAccountRequest())
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error())
  })
})
