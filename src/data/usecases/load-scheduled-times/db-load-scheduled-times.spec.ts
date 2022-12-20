import { DbLoadScheduledTimes } from './db-load-scheduled-times'
import { LoadScheduledTimesRepositoryStub } from '../../tests/db/mock-load-scheduled-times-repository'

describe('DbLoadScheduledTimes usecase', () => {
  test('Should call LoadScheduledTimesRepository', async () => {
    const loadScheduledTimesRepositoryStub = new LoadScheduledTimesRepositoryStub()
    const loadSpy = jest.spyOn(loadScheduledTimesRepositoryStub, 'loadAll')
    const sut = new DbLoadScheduledTimes(loadScheduledTimesRepositoryStub)
    await sut.loadAll()
    expect(loadSpy).toHaveBeenCalled()
  })
})