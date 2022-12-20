import { ScheduledTimeResult } from '../../../domain/models/scheduled-time-result'
import { LoadScheduledTimes } from '../../../domain/usecases/load-scheduled-times'
import { LoadScheduledTimesRepository } from '../../protocols/db/load-scheduled-times-repository'

export class DbLoadScheduledTimes implements LoadScheduledTimes {
  constructor (private readonly loadScheduledTimesRepository: LoadScheduledTimesRepository) {}

  async loadAll (): Promise<ScheduledTimeResult[]> {
    await this.loadScheduledTimesRepository.loadAll()
    return await Promise.resolve(null) as any
  }
}