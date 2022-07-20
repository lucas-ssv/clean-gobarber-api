import { DbAddAccount } from './db-add-account'
import { AddAccountRepositoryStub, mockFakeAddAccountRequest } from '../../tests/mock-add-account-repository'

describe('DbAddAccount usecase', () => {
  test('Should call AddAccountRepository with correct values', async () => {
    const addAccountRepositoryStub = new AddAccountRepositoryStub()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const sut = new DbAddAccount(addAccountRepositoryStub)
    const fakeAddAccountRequest = mockFakeAddAccountRequest()
    await sut.add(fakeAddAccountRequest)
    expect(addSpy).toHaveBeenCalledWith(fakeAddAccountRequest)
  })
})
