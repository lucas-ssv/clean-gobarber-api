import { DbAddSchedule } from './db-add-schedule'
import { AddScheduleRepositoryStub } from '../../tests/db/mock-add-schedule-repository'
import { AddScheduleRepository } from '../../protocols/db/add-schedule-repository'
import { mockSchedule } from '../../tests/db/mock-schedule'

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
    const schedule = mockSchedule()
    await sut.add(schedule)
    expect(addSpy).toHaveBeenCalledWith(schedule)
  })

  test('Should throw if AddScheduleRepository throws', async () => {
    const { sut, addScheduleRepositoryStub } = makeSut()
    jest.spyOn(addScheduleRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockSchedule())
    await expect(promise).rejects.toThrow()
  })
})
