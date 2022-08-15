import { AccountModel } from '../../../domain/models/account'
import { LoadByEmail } from '../../../domain/usecases/load-by-email'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'

export class DbLoadByEmail implements LoadByEmail {
  constructor (private readonly loadByEmailRepository: LoadByEmailRepository) {}

  async loadByEmail (email: string): Promise<AccountModel> {
    const account = await this.loadByEmailRepository.loadByEmail(email)
    return account
  }
}
