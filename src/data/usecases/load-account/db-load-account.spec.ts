import { DbLoadAccount } from './db-load-account'
import { LoadAccountRepositoryStub } from '../../tests/db/mock-load-account-repository'
import { LoadAccountRepository } from '../../protocols/db/load-account-repository'

type SutTypes = {
  sut: DbLoadAccount
  loadAccountRepositoryStub: LoadAccountRepository
}

const makeSut = (): SutTypes => {
  const loadAccountRepositoryStub = new LoadAccountRepositoryStub()
  const sut = new DbLoadAccount(loadAccountRepositoryStub)
  return {
    sut,
    loadAccountRepositoryStub
  }
}

describe('DbLoadAccount usecase', () => {
  test('Should call LoadAccountRepository with correct value', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountRepositoryStub, 'load')
    await sut.load('any_id')
    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })
})