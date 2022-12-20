import { ScheduledTimeResult } from '../../../domain/models/scheduled-time-result'
import { LoadScheduledTimesRepository } from '../../protocols/db/load-scheduled-times-repository'

export const mockScheduledTimes = (): ScheduledTimeResult[] => ([{
  id: 'any_id',
  time: 'any_time',
  account: {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    isBarber: false
  }
}, {
  id: 'other_id',
  time: 'other_time',
  account: {
    id: 'other_id',
    name: 'other_name',
    email: 'other_email@mail.com',
    password: 'other_password',
    isBarber: true
  }
}])

export class LoadScheduledTimesRepositoryStub implements LoadScheduledTimesRepository {
  async loadAll (): Promise<ScheduledTimeResult[]> {
    return mockScheduledTimes()
  }
}