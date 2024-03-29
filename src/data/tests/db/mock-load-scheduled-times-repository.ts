import { ScheduledTimeResult } from '../../../domain/models/scheduled-time-result'
import { mockScheduledTimes } from '../../../domain/tests/scheduled-times/mock-scheduled-times'
import { LoadScheduledTimesRepository } from '../../protocols/db/load-scheduled-times-repository'

export class LoadScheduledTimesRepositoryStub implements LoadScheduledTimesRepository {
  async loadAll (): Promise<ScheduledTimeResult[]> {
    return mockScheduledTimes()
  }
}