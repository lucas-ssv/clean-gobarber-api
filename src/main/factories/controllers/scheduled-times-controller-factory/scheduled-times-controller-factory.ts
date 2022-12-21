import { DbLoadScheduledTimes } from '../../../../data/usecases/load-scheduled-times/db-load-scheduled-times'
import { ScheduledTimesRepository } from '../../../../infra/db/scheduled-times/scheduled-times'
import { LoadScheduledTimesController } from '../../../../presentation/controllers/scheduled-times/load-scheduled-times-controller'
import { Controller } from '../../../../presentation/protocols/controller'

export const makeLoadScheduledTimesController = (): Controller => {
  const scheduledTimesRepository = new ScheduledTimesRepository()
  const loadScheduledTimes = new DbLoadScheduledTimes(scheduledTimesRepository)
  return new LoadScheduledTimesController(loadScheduledTimes)
}