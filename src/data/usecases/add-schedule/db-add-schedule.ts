import { AddSchedule, AddScheduleParams } from '../../../domain/usecases/add-schedule'
import { AddScheduleRepository } from '../../protocols/db/add-schedule-repository'

export class DbAddSchedule implements AddSchedule {
  constructor (private readonly addScheduleRepository: AddScheduleRepository) {}

  async add (schedule: AddScheduleParams): Promise<void> {
    await this.addScheduleRepository.add(schedule)
  }
}
