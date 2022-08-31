import { DbLoadSchedules } from './db-load-schedules'
import { LoadSchedulesRepositoryStub } from '../../tests/db/mock-load-schedules'

describe('DbLoadSchedules', () => {
  test('Should call LoadSchedulesRepository with correct value', async () => {
    const loadSchedulesRepositoryStub = new LoadSchedulesRepositoryStub()
    const loadSpy = jest.spyOn(loadSchedulesRepositoryStub, 'load')
    const sut = new DbLoadSchedules(loadSchedulesRepositoryStub)
    await sut.load('any_account_id')
    expect(loadSpy).toHaveBeenCalledWith('any_account_id')
  })
})
