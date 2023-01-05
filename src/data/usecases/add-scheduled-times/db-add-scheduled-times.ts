import { AddScheduledTimes } from '../../../domain/usecases/add-scheduled-times'
import { AddScheduledTimesRepository } from '../../protocols/db/add-scheduled-times-repository';
import { LoadAccountRepository } from '../../protocols/db/load-account-repository';

export class DbAddScheduledTimes implements AddScheduledTimes {
  constructor (
    private readonly loadAccountRepository: LoadAccountRepository,
    private readonly addScheduledTimesRepository: AddScheduledTimesRepository
  ) {}

  async add (params: AddScheduledTimes.Params): Promise<void> {
    const account = await this.loadAccountRepository.load(params.accountId)
    if (account) {
      await this.addScheduledTimesRepository.add(params)
    }
  }
}