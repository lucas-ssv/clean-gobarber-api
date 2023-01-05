import { AddScheduledTimesController } from '../../../../presentation/controllers/scheduled-times/add-scheduled-times/add-scheduled-times-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { makeDbAddScheduledTimes } from '../../usecases/add-scheduled-times/db-add-scheduled-times-factory'
import { makeAddScheduledTimesValidations } from './add-scheduled-times-validations'

export const makeScheduledTimesController = (): Controller => {
  return new AddScheduledTimesController(makeAddScheduledTimesValidations(), makeDbAddScheduledTimes())
}