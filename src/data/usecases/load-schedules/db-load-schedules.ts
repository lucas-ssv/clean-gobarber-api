import { ScheduleModel } from '../../../domain/models/schedule'
import { LoadSchedules } from '../../../domain/usecases/load-schedules'
import { LoadSchedulesRepository } from '../../protocols/db/load-schedules-repository'

export class DbLoadSchedules implements LoadSchedules {
  constructor (private readonly loadSchedulesRepository: LoadSchedulesRepository) {}

  async loadAll (accountId: string): Promise<ScheduleModel[]> {
    await this.loadSchedulesRepository.loadAll(accountId)
    return null
  }
}
