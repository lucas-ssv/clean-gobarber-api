import { ScheduleModel } from '../../../domain/models/schedule'

export interface LoadSchedulesRepository {
  loadAll: (accountId: string) => Promise<ScheduleModel[]>
}
