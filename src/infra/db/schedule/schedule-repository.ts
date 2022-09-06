import { AddScheduleRepository } from '../../../data/protocols/db/add-schedule-repository'
import { AddScheduleParams } from '../../../domain/usecases/add-schedule'
import { Schedule } from '../database/entities/schedule'
import { DbHelper } from '../helpers/db-helper'

export class ScheduleRepository implements AddScheduleRepository {
  async add (schedule: AddScheduleParams): Promise<void> {
    const repo = await DbHelper.getRepository(Schedule)
    await repo.insert(schedule as any)
  }
}
