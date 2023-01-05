import { Account } from './account'

export interface ScheduledTimeResult {
  id: string
  date: Date
  time: string
  account: Account
}