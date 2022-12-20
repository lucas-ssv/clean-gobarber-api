import { LoadScheduledTimesRepository } from '../../../data/protocols/db/load-scheduled-times-repository'
import { ScheduledTimeResult } from '../../../domain/models/scheduled-time-result'
import { client } from '../client'

export class ScheduledTimesRepository implements LoadScheduledTimesRepository {
  async loadAll (): Promise<ScheduledTimeResult[]> {
    const scheduledTimes = await client.scheduledTimes.findMany({
      include: {
        account: true
      },
    })
    const result = scheduledTimes.map(scheduleTime => ({
      id: scheduleTime.id,
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
}