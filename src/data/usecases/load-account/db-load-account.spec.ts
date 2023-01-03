import { DbLoadAccount } from './db-load-account'
import { LoadAccountRepositoryStub } from '../../tests/db/mock-load-account-repository'

describe('DbLoadAccount usecase', () => {
  test('Should call LoadAccountRepository with correct value', async () => {
    const loadAccountRepositoryStub = new LoadAccountRepositoryStub()
    const loadSpy = jest.spyOn(loadAccountRepositoryStub, 'load')
    const sut = new DbLoadAccount(loadAccountRepositoryStub)
    await sut.load('any_id')
    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })
})