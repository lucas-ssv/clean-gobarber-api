import { AddScheduledTimes } from "../../../domain/usecases/add-scheduled-times";

export const mockAddScheduledTimesParams = (): AddScheduledTimes.Params => ({
  date: new Date(),
  time: 'any_time',
  accountId: 'any_account_id'
})