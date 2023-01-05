import { ScheduledTimeResult } from '../../../domain/models/scheduled-time-result'
import { AddScheduledTimes } from '../../../domain/usecases/add-scheduled-times'

export interface AddScheduledTimesRepository {
  add: (params: AddScheduledTimes.Params) => Promise<ScheduledTimeResult>
}