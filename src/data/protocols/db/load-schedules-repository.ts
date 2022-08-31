import { ScheduleModel } from '../../../domain/models/schedule'

export interface LoadSchedulesRepository {
  load: (accountId: string) => Promise<ScheduleModel>
}
