import { ScheduleRepository } from './schedule-repository'
import { mockSchedule } from '../../../data/tests/db/mock-schedule'
import { Schedule } from '../database/entities/schedule'
import { DbHelper } from '../helpers/db-helper'
import { ObjectLiteral, Repository } from 'typeorm'

let scheduleRepository: Repository<ObjectLiteral>

describe('ScheduleRepository', () => {
  beforeAll(async () => {
    await (await DbHelper.getRepository(Schedule)).clear()
    scheduleRepository = await DbHelper.getRepository(Schedule)
  })

  test('Should add a schedule on success', async () => {
    const sut = new ScheduleRepository()
    await sut.add(mockSchedule())
    const count = await scheduleRepository.count()
    expect(count).toBe(1)
  })
})
