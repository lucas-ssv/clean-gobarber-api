import { DbAddSchedule } from './db-add-schedule'
import { AddScheduleRepositoryStub } from '../../tests/db/mock-add-schedule-repository'

describe('DbAddSchedule', () => {
  test('Should call AddScheduleRepository with correct values', async () => {
    const addScheduleRepositoryStub = new AddScheduleRepositoryStub()
    const addSpy = jest.spyOn(addScheduleRepositoryStub, 'add')
    const sut = new DbAddSchedule(addScheduleRepositoryStub)
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
