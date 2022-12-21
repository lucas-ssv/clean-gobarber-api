import { LoadScheduledTimesController } from '../../../../presentation/controllers/scheduled-times/load-scheduled-times-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { makeDbLoadScheduledTimes } from '../../usecases/load-scheduled-times/db-load-scheduled-times-factory'

export const makeLoadScheduledTimesController = (): Controller => {
  return new LoadScheduledTimesController(makeDbLoadScheduledTimes())
}