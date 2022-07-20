import { DbAddAccount } from './db-add-account'
import { AddAccountRepositoryStub, mockFakeAddAccountRequest } from '../../tests/mock-add-account-repository'
import { AddAccountRepository } from '../../protocols/add-account-repository'

type SutTypes = {
  sut: DbAddAccount
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = new AddAccountRepositoryStub()
  const sut = new DbAddAccount(addAccountRepositoryStub)
  return {
    sut,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount usecase', () => {
  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const fakeAddAccountRequest = mockFakeAddAccountRequest()
    await sut.add(fakeAddAccountRequest)
    expect(addSpy).toHaveBeenCalledWith(fakeAddAccountRequest)
  })
})
