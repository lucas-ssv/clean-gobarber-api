import { DbLoadSchedules } from './db-load-schedules'
import { LoadSchedulesRepositoryStub, mockSchedules } from '../../tests/db/mock-load-schedules'
import { LoadSchedulesRepository } from '../../protocols/db/load-schedules-repository'

type SutTypes = {
  sut: DbLoadSchedules
  loadSchedulesRepositoryStub: LoadSchedulesRepository
}

const makeSut = (): SutTypes => {
  const loadSchedulesRepositoryStub = new LoadSchedulesRepositoryStub()
  const sut = new DbLoadSchedules(loadSchedulesRepositoryStub)
  return {
    sut,
    loadSchedulesRepositoryStub
  }
}

describe('DbLoadSchedules', () => {
  test('Should call LoadSchedulesRepository with correct value', async () => {
    const { sut, loadSchedulesRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadSchedulesRepositoryStub, 'loadAll')
    await sut.loadAll('any_account_id')
    expect(loadSpy).toHaveBeenCalledWith('any_account_id')
  })

  test('Should return a schedules list on success', async () => {
    const { sut } = makeSut()
    const schedules = await sut.loadAll('any_account_id')
    expect(schedules).toEqual(mockSchedules())
  })
})
