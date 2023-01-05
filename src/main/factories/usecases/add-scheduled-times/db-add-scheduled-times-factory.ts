import { DbAddScheduledTimes } from '../../../../data/usecases/add-scheduled-times/db-add-scheduled-times'
import { AddScheduledTimes } from '../../../../domain/usecases/add-scheduled-times'
import { AccountRepository } from '../../../../infra/db/account/account-repository'
import { ScheduledTimesRepository } from '../../../../infra/db/scheduled-times/scheduled-times'

export const makeDbAddScheduledTimes = (): AddScheduledTimes => {
  const accountRepository = new AccountRepository()
  const scheduledTimesRepository = new ScheduledTimesRepository()
  return new DbAddScheduledTimes(accountRepository, scheduledTimesRepository)
}