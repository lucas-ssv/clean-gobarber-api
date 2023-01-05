import { ScheduledTimeResult } from '../../../domain/models/scheduled-time-result'
import { AddScheduledTimes } from '../../../domain/usecases/add-scheduled-times'
import { HttpRequest } from '../../protocols/http'

export const mockAddScheduledTimesRequest = (): HttpRequest => ({
  body: {
    date: new Date(),
    time: 'any_time',
    accountId: 'any_account_id'
  }
})

export class AddScheduledTimesStub implements AddScheduledTimes {
  async add (params: AddScheduledTimes.Params): Promise<ScheduledTimeResult> {
    return {
      id: 'any_id',
      date: new Date(),
      time: 'any_time',
      account: {
        id: 'any_account_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        isBarber: true
      }
    }
  }
}