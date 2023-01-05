import { client } from '../client'
import { ScheduledTimesRepository } from './scheduled-times'

jest.useFakeTimers().setSystemTime(new Date())

describe('ScheduledTimesRepository', () => {
  beforeEach(async () => {
    await client.scheduledTimes.deleteMany()
    await client.account.deleteMany()
  })

  afterEach(async () => {
    await client.scheduledTimes.deleteMany()
    await client.account.deleteMany()
  })

  describe('loadAll()', () => {
    test('Should load all scheduled times on success', async () => {
      const sut = new ScheduledTimesRepository()
      const account = await client.account.create({
        data: {
          name: 'other_name',
          email: 'other_email@mail.com',
          password: 'other_password'
        }
      })
      await client.scheduledTimes.create({
        data: {
          time: '08:00',
          account_id: account.id
        }
      })
      const scheduledTimes = await sut.loadAll()
      expect(scheduledTimes.length).toBe(1)
    })
  })

  describe('add()', () => {
    test('Should add scheduled times on add success', async () => {
      const sut = new ScheduledTimesRepository()
      await client.account.create({
        data: {
          id: 'any_account_id',
          name: 'other_name',
          email: 'other_email@mail.com',
          password: 'other_password'
        }
      })
      await sut.add({
        date: new Date(),
        time: 'any_time',
        accountId: 'any_account_id'
      })
      const scheduledTimes = await client.scheduledTimes.findFirst({
        where: {
          account_id: 'any_account_id'
        }
      })
      expect(scheduledTimes?.date).toEqual(new Date())
      expect(scheduledTimes?.time).toBe('any_time')
      expect(scheduledTimes?.account_id).toBe('any_account_id')
    })
  })
})