import { client } from '../client'
import { ScheduledTimesRepository } from './scheduled-times'

describe('ScheduledTimesRepository', () => {
  beforeEach(async () => {
    await client.scheduledTimes.deleteMany()
    await client.account.deleteMany()
  })

  afterEach(async () => {
    await client.scheduledTimes.deleteMany()
    await client.account.deleteMany()
  })

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