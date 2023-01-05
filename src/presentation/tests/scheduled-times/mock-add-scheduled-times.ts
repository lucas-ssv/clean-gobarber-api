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
  async add (params: AddScheduledTimes.Params): Promise<void> {}
}