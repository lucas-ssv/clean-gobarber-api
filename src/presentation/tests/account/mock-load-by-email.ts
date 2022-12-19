import { Account } from '../../../domain/models/account';
import { mockAccount } from '../../../domain/tests/account/mock-account';
import { LoadByEmail } from '../../../domain/usecases/load-by-email'

export class LoadByEmailStub implements LoadByEmail<Account> {
  async loadByEmail (email: string): Promise<Account> {
    return mockAccount()
  }
}