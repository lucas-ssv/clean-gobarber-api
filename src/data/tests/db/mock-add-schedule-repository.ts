import { AddScheduleParams } from '../../../domain/usecases/add-schedule'
import { AddScheduleRepository } from '../../protocols/db/add-schedule-repository'

export class AddScheduleRepositoryStub implements AddScheduleRepository {
  async add (schedule: AddScheduleParams): Promise<void> {}
}
