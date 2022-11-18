import { AddScheduleParams } from '../../../domain/usecases/add-schedule'

export interface AddScheduleRepository {
  add: (schedule: AddScheduleParams) => Promise<void>
}
