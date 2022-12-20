import { ScheduledTimeResult } from '../../../domain/models/scheduled-time-result'
import { LoadScheduledTimesRepository } from '../../protocols/db/load-scheduled-times-repository'

export class LoadScheduledTimesRepositoryStub implements LoadScheduledTimesRepository {
  async loadAll (): Promise<ScheduledTimeResult[]> {
    return [{
      time: 'any_time',
      accountId: 'any_account_id'
    }]
  }
}