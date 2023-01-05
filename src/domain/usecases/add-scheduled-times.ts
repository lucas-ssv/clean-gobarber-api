import { ScheduledTimeResult } from '../models/scheduled-time-result'

export interface AddScheduledTimes {
  add: (params: AddScheduledTimes.Params) => Promise<ScheduledTimeResult>
}

export namespace AddScheduledTimes {
  export type Params = {
    date: Date
    time: string
    accountId: string
  }
}