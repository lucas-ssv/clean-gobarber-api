import { ScheduledTimeResult } from '../models/scheduled-time-result'

export interface LoadScheduledTimes {
  loadAll: () => Promise<ScheduledTimeResult[]>
}