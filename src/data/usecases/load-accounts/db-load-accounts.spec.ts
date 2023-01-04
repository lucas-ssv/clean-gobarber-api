import { DbLoadAccounts } from './db-load-accounts'
import { LoadAccountsRepositoryStub } from '../../tests/db/mock-load-accounts-repository'
import { LoadAccountsRepository } from '../../protocols/db/load-accounts-repository'

type SutTypes = {
  sut: DbLoadAccounts
  loadAccountsRepositoryStub: LoadAccountsRepository
}

const makeSut = (): SutTypes => {
  const loadAccountsRepositoryStub = new LoadAccountsRepositoryStub()
  const sut = new DbLoadAccounts(loadAccountsRepositoryStub)
  return {
    sut,
    loadAccountsRepositoryStub
  }
}

describe('DbLoadAccounts usecase', () => {
  test('Should call LoadAccountsRepository with correct value', async () => {
    const { sut, loadAccountsRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountsRepositoryStub, 'loadAll')
    await sut.loadAll({ isBarber: true })
    expect(loadSpy).toHaveBeenCalledWith({ isBarber: true })
  })

  test('Should return an empty list if LoadAccountsRepository returns empty', async () => {
    const { sut, loadAccountsRepositoryStub } = makeSut()
    jest.spyOn(loadAccountsRepositoryStub, 'loadAll').mockReturnValueOnce(Promise.resolve([]))
    const accounts = await sut.loadAll({ isBarber: true })
    expect(accounts).toEqual([])
  })
})