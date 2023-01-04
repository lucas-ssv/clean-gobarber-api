import { DbLoadAccounts } from './db-load-accounts'
import { LoadAccountsRepositoryStub } from '../../tests/db/mock-load-accounts-repository'

describe('DbLoadAccounts usecase', () => {
  test('Should call LoadAccountsRepository with correct value', async () => {
    const loadAccountsRepositoryStub = new LoadAccountsRepositoryStub()
    const loadSpy = jest.spyOn(loadAccountsRepositoryStub, 'loadAll')
    const sut = new DbLoadAccounts(loadAccountsRepositoryStub)
    await sut.loadAll({ isBarber: true })
    expect(loadSpy).toHaveBeenCalledWith({ isBarber: true })
  })
})