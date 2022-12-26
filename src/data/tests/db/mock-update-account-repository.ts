import { mockUpdateAccountResult } from '../../../domain/tests/account/mock-update-account'
import { UpdateAccountRepository } from '../../protocols/db/update-account-repository'

export class UpdateAccountRepositoryStub implements UpdateAccountRepository {
  async update (params: UpdateAccountRepository.Params): Promise<UpdateAccountRepository.Result> {
    return mockUpdateAccountResult()
  }
}