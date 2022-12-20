import { DbLoadScheduledTimes } from './db-load-scheduled-times'
import { LoadScheduledTimesRepositoryStub } from '../../tests/db/mock-load-scheduled-times-repository'
import { LoadScheduledTimesRepository } from '../../protocols/db/load-scheduled-times-repository'

type SutTypes = {
  sut: DbLoadScheduledTimes
  loadScheduledTimesRepositoryStub: LoadScheduledTimesRepository
}

const makeSut = (): SutTypes => {
  const loadScheduledTimesRepositoryStub = new LoadScheduledTimesRepositoryStub()
  const sut = new DbLoadScheduledTimes(loadScheduledTimesRepositoryStub)
  return {
    sut,
    loadScheduledTimesRepositoryStub
  }
}

describe('DbLoadScheduledTimes usecase', () => {
  test('Should call LoadScheduledTimesRepository', async () => {
    const { sut, loadScheduledTimesRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadScheduledTimesRepositoryStub, 'loadAll')
    await sut.loadAll()
    expect(loadSpy).toHaveBeenCalled()
  })
})