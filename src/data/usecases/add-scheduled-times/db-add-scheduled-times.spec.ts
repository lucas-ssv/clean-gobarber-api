import { DbAddScheduledTimes } from './db-add-scheduled-times'
import { LoadAccountRepositoryStub } from '../../tests/db/mock-load-account-repository'
import { LoadAccountRepository } from '../../protocols/db/load-account-repository'
import { AddScheduledTimesRepositoryStub, mockAddScheduledTimesParams } from '../../tests/db/mock-add-scheduled-times-repository'
import { AddScheduledTimesRepository } from '../../protocols/db/add-scheduled-times-repository'

jest.useFakeTimers().setSystemTime(new Date())

type SutTypes = {
  sut: DbAddScheduledTimes
  loadAccountRepositoryStub: LoadAccountRepository
  addScheduledTimesRepositoryStub: AddScheduledTimesRepository
}

const makeSut = (): SutTypes => {
  const loadAccountRepositoryStub = new LoadAccountRepositoryStub()
  const addScheduledTimesRepositoryStub = new AddScheduledTimesRepositoryStub()
  const sut = new DbAddScheduledTimes(loadAccountRepositoryStub, addScheduledTimesRepositoryStub)
  return {
    sut,
    loadAccountRepositoryStub,
    addScheduledTimesRepositoryStub
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

  test('Should call AddScheduledTimesRepository with correct values', async () => {
    const { sut, addScheduledTimesRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addScheduledTimesRepositoryStub, 'add')
    await sut.add(mockAddScheduledTimesParams())
    expect(addSpy).toHaveBeenCalledWith({
      date: new Date(),
      time: 'any_time',
      accountId: 'any_account_id'
    })
  })
})