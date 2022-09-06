import { ScheduleRepository } from './schedule-repository'
import { mockSchedule } from '../../../data/tests/db/mock-schedule'
import { Schedule } from '../database/entities/schedule'
import { DbHelper } from '../helpers/db-helper'
import { ObjectLiteral, Repository } from 'typeorm'
import MockDate from 'mockdate'

let scheduleRepository: Repository<ObjectLiteral>

describe('ScheduleRepository', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    await (await DbHelper.getRepository(Schedule)).clear()
    scheduleRepository = await DbHelper.getRepository(Schedule)
  })

  afterAll(() => {
    MockDate.reset()
  })

  describe('add()', () => {
    test('Should add a schedule on success', async () => {
      const sut = new ScheduleRepository()
      await sut.add(mockSchedule())
      const count = await scheduleRepository.count()
      expect(count).toBe(1)
    })
  })

  describe('loadAll()', () => {
    test('Should return a list of schedules on success', async () => {
      const sut = new ScheduleRepository()
      const schedules = await sut.loadAll('any_account_id')
      expect(schedules[0].description).toBe('any_description')
      expect(schedules[0].scheduledTime).toEqual(new Date())
      expect(schedules[0].accountId).toBe('any_account_id')
    })
  })
})
