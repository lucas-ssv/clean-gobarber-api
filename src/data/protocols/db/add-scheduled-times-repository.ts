import { AddScheduledTimes } from '../../../domain/usecases/add-scheduled-times'

export interface AddScheduledTimesRepository {
  add: (params: AddScheduledTimes.Params) => Promise<void>
}