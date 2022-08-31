import { ScheduleModel } from '../models/schedule'

export interface LoadSchedules {
  load: (accountId: string) => Promise<ScheduleModel>
}
