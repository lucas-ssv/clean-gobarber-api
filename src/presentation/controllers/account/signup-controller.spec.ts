import { SignUpController } from './signup-controller'
import { AddAccountStub } from '../../test/account/mock-add-account'
import { mockFakeAddAccountRequest } from '../../test/account/mock-fake-add-account-request'
import { AddAccount } from '../../../domain/usecases/add-account'
import { MissingParamError } from '../../errors/missing-param-error'

type SutTypes = {
  sut: SignUpController
  addAccountStub: AddAccount
}

const makeSut = (): SutTypes => {
  const addAccountStub = new AddAccountStub()
  const sut = new SignUpController(addAccountStub)
  return {
    sut,
    addAccountStub
  }
}

describe('SignUpController', () => {
  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(mockFakeAddAccountRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      isBarber: false
    })
  })

  test('Should return 400 if name is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        isBarber: false
      }
    })
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if email is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        isBarber: false
      }
    })
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})
