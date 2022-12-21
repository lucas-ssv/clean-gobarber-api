import { ScheduledTimeResult } from '../../../domain/models/scheduled-time-result'
import { mockScheduledTimes } from '../../../domain/tests/scheduled-times/mock-scheduled-times'
import { LoadScheduledTimes } from '../../../domain/usecases/load-scheduled-times'

export class LoadScheduledTimesStub implements LoadScheduledTimes {
  async loadAll (): Promise<ScheduledTimeResult[]> {
    return mockScheduledTimes()
  }
}