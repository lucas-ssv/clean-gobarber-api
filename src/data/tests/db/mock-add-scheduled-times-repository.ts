import { AddScheduledTimes } from "../../../domain/usecases/add-scheduled-times";
import { AddScheduledTimesRepository } from "../../protocols/db/add-scheduled-times-repository";

export const mockAddScheduledTimesParams = (): AddScheduledTimes.Params => ({
  date: new Date(),
  time: 'any_time',
  accountId: 'any_account_id'
})

export class AddScheduledTimesRepositoryStub implements AddScheduledTimesRepository {
  async add (params: AddScheduledTimes.Params): Promise<void> {}
}