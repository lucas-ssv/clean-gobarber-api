import { ScheduledTimeResult } from '../../../domain/models/scheduled-time-result';
import { AddScheduledTimes } from '../../../domain/usecases/add-scheduled-times'
import { AddScheduledTimesRepository } from '../../protocols/db/add-scheduled-times-repository';
import { LoadAccountRepository } from '../../protocols/db/load-account-repository';

export class DbAddScheduledTimes implements AddScheduledTimes {
  constructor (
    private readonly loadAccountRepository: LoadAccountRepository,
    private readonly addScheduledTimesRepository: AddScheduledTimesRepository
  ) {}

  async add (params: AddScheduledTimes.Params): Promise<ScheduledTimeResult> {
    const account = await this.loadAccountRepository.load(params.accountId)
    if (account) {
      const scheduledTimes = await this.addScheduledTimesRepository.add(params)
      return scheduledTimes
    }
    return null as any
  }
}