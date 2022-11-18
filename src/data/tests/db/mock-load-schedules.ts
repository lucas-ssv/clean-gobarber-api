import { ScheduleModel } from '../../../domain/models/schedule'
import { LoadSchedulesRepository } from '../../protocols/db/load-schedules-repository'

export const mockSchedules = (): ScheduleModel[] => {
  return [{
    id: 'any_id',
    description: 'any_description',
    scheduledTime: new Date(),
    accountId: 'any_account_id',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    id: 'other_id',
    description: 'other_description',
    scheduledTime: new Date(),
    accountId: 'other_account_id',
    createdAt: new Date(),
    updatedAt: new Date()
  }]
}

export class LoadSchedulesRepositoryStub implements LoadSchedulesRepository {
  async loadAll (accountId: string): Promise<ScheduleModel[]> {
    return mockSchedules()
  }
}
