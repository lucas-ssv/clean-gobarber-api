import { ScheduleModel } from '../../../domain/models/schedule'
import { LoadSchedulesRepository } from '../../protocols/db/load-schedules-repository'

export class LoadSchedulesRepositoryStub implements LoadSchedulesRepository {
  async loadAll (accountId: string): Promise<ScheduleModel> {
    return {
      id: 'any_id',
      description: 'any_description',
      scheduledTime: new Date(),
      accountId: 'any_account_id',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
}
