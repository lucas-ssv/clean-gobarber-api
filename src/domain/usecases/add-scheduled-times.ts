import { Account } from '../models/account'

export interface AddScheduledTimes {
  add: (params: AddScheduledTimes.Params) => Promise<void>
}

export namespace AddScheduledTimes {
  export type Params = {
    date: Date
    time: string
    account: Account
  }
}