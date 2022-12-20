import { ScheduledTimeResult } from "../../../domain/models/scheduled-time-result"

export interface LoadScheduledTimesRepository {
  loadAll: () => Promise<LoadScheduledTimesRepository.Result[]>
}

export namespace LoadScheduledTimesRepository {
  export type Result = ScheduledTimeResult
}