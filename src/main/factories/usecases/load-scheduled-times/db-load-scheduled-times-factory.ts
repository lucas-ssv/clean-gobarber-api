import { DbLoadScheduledTimes } from "../../../../data/usecases/load-scheduled-times/db-load-scheduled-times";
import { LoadScheduledTimes } from "../../../../domain/usecases/load-scheduled-times";
import { ScheduledTimesRepository } from "../../../../infra/db/scheduled-times/scheduled-times";

export const makeDbLoadScheduledTimes = (): LoadScheduledTimes => {
  const scheduledTimesRepository = new ScheduledTimesRepository()
  return new DbLoadScheduledTimes(scheduledTimesRepository)
}