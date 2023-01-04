import { LoadAccounts } from '../../../domain/usecases/load-accounts'
import { LoadAccountsRepository } from '../../protocols/db/load-accounts-repository'

export class LoadAccountsRepositoryStub implements LoadAccountsRepository {
  async loadAll (params: LoadAccounts.Params): Promise<LoadAccountsRepository.Result> {
    return [{
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      isBarber: true,
    }, {
      id: 'other_id',
      name: 'other_name',
      email: 'other_email@mail.com',
      password: 'other_password',
      isBarber: false,
    }]
  }
}