import { DbAddScheduledTimes } from './db-add-scheduled-times'
import { LoadAccountRepositoryStub } from '../../tests/db/mock-load-account-repository'
import { LoadAccountRepository } from '../../protocols/db/load-account-repository'
import { mockAddScheduledTimesParams } from '../../tests/db/mock-add-scheduled-times-repository'

type SutTypes = {
  sut: DbAddScheduledTimes
  loadAccountRepositoryStub: LoadAccountRepository
}

const makeSut = (): SutTypes => {
  const loadAccountRepositoryStub = new LoadAccountRepositoryStub()
  const sut = new DbAddScheduledTimes(loadAccountRepositoryStub)
  return {
    sut,
    loadAccountRepositoryStub
  }
}

describe('DbAddScheduledTimes usecase', () => {
  test('Should call LoadAccountRepository with correct value', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountRepositoryStub, 'load')
    await sut.add(mockAddScheduledTimesParams())
    expect(loadSpy).toHaveBeenCalledWith('any_account_id')
  })

  test('Should throw if LoadAccountRepository throws', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()
    jest.spyOn(loadAccountRepositoryStub, 'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAddScheduledTimesParams())
    await expect(promise).rejects.toThrow()
  })
})