import { ScheduleModel } from '../models/schedule'

export interface LoadSchedules {
  loadAll: (accountId: string) => Promise<ScheduleModel[]>
}
