import { AddScheduledTimes } from '../../../domain/usecases/add-scheduled-times'
import { LoadAccountRepository } from '../../protocols/db/load-account-repository';

export class DbAddScheduledTimes implements AddScheduledTimes {
  constructor (private readonly loadAccountRepository: LoadAccountRepository) {}

  async add (params: AddScheduledTimes.Params): Promise<void> {
    await this.loadAccountRepository.load(params.accountId)
  }
}