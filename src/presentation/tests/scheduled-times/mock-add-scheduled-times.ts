import { HttpRequest } from '../../protocols/http'

export const mockAddScheduledTimesRequest = (): HttpRequest => ({
  body: {
    date: new Date(),
    time: '09:00',
    accountId: 'any_account_id'
  }
})