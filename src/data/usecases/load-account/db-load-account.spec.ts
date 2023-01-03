import { DbLoadAccount } from './db-load-account'
import { LoadAccountRepositoryStub } from '../../tests/db/mock-load-account-repository'
import { LoadAccountRepository } from '../../protocols/db/load-account-repository'
import { mockLoadAccount } from '../../../domain/tests/account/mock-load-account'

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

  test('Should return null if LoadAccountRepository returns null', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()
    jest.spyOn(loadAccountRepositoryStub, 'load').mockReturnValueOnce(Promise.resolve(null) as any)
    const account = await sut.load('any_id')
    expect(account).toBeNull()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_id')
    expect(account).toEqual(mockLoadAccount())
  })
})