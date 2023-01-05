import { AddScheduledTimesRepository } from '../../../data/protocols/db/add-scheduled-times-repository'
import { LoadScheduledTimesRepository } from '../../../data/protocols/db/load-scheduled-times-repository'
import { ScheduledTimeResult } from '../../../domain/models/scheduled-time-result'
import { AddScheduledTimes } from '../../../domain/usecases/add-scheduled-times'
import { client } from '../client'

export class ScheduledTimesRepository implements LoadScheduledTimesRepository, AddScheduledTimesRepository {
  async loadAll (): Promise<ScheduledTimeResult[]> {
    const scheduledTimes = await client.scheduledTimes.findMany({
      include: {
        account: true
      },
    })
    const result = scheduledTimes.map(scheduleTime => ({
      id: scheduleTime.id,
      date: scheduleTime.date,
      time: scheduleTime.time,
      account: {
        id: scheduleTime.account.id,
        name: scheduleTime.account.name,
        email: scheduleTime.account.email,
        password: scheduleTime.account.password,
        isBarber: scheduleTime.account.is_barber
      }
    }))
    return result
  }

  async add (params: AddScheduledTimes.Params): Promise<ScheduledTimeResult> {
    const scheduledTimes = await client.scheduledTimes.create({
      data: {
        date: params.date,
        time: params.time,
        account_id: params.accountId
      },
      include: {
        account: true
      }
    })
    const { account_id, ...restScheduledTimes } = scheduledTimes
    return {
      ...restScheduledTimes
    } as any
  }
}