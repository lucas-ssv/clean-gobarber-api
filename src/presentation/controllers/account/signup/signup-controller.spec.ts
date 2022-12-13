import { SignUpController } from './signup-controller'
import { AddAccountStub, mockHttpRequest } from '../../../tests/account/mock-add-account'
import { AddAccount } from '../../../../domain/usecases/add-account'
import { Controller } from '../../../protocols/controller'

type SutTypes = {
  sut: Controller
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
    await sut.handle(mockHttpRequest())
    expect(addSpy).toHaveBeenCalledWith(mockHttpRequest().body)
  })
})