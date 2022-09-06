import { DbAddSchedule } from './db-add-schedule'
import { AddScheduleRepositoryStub } from '../../tests/db/mock-add-schedule-repository'
import { AddScheduleRepository } from '../../protocols/db/add-schedule-repository'

type SutTypes = {
  sut: DbAddSchedule
  addScheduleRepositoryStub: AddScheduleRepository
}

const makeSut = (): SutTypes => {
  const addScheduleRepositoryStub = new AddScheduleRepositoryStub()
  const sut = new DbAddSchedule(addScheduleRepositoryStub)
  return {
    sut,
    addScheduleRepositoryStub
  }
}

describe('DbAddSchedule', () => {
  test('Should call AddScheduleRepository with correct values', async () => {
    const { sut, addScheduleRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addScheduleRepositoryStub, 'add')
    const schedule = {
      description: 'any_description',
      scheduledTime: new Date(),
      account: {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com'
      }
    }
    await sut.add(schedule)
    expect(addSpy).toHaveBeenCalledWith(schedule)
  })
})
