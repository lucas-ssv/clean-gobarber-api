import { AddScheduleRepository } from '../../../data/protocols/db/add-schedule-repository'
import { LoadSchedulesRepository } from '../../../data/protocols/db/load-schedules-repository'
import { ScheduleModel } from '../../../domain/models/schedule'
import { AddScheduleParams } from '../../../domain/usecases/add-schedule'
import { Schedule } from '../database/entities/schedule'
import { DbHelper } from '../helpers/db-helper'

export class ScheduleRepository implements AddScheduleRepository, LoadSchedulesRepository {
  async add (schedule: AddScheduleParams): Promise<void> {
    const repo = await DbHelper.getRepository(Schedule)
    await repo.insert(schedule as any)
  }

  async loadAll (accountId: string): Promise<ScheduleModel[]> {
    const repo = await DbHelper.getRepository(Schedule)
    const schedules = await repo.find({ where: { accountId } })
    return schedules as ScheduleModel[]
  }
}
