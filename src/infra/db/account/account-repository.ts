import { AddAccountRepository } from '../../../data/protocols/db/add-account-repository'
import { AccountParams } from '../../../domain/usecases/add-account'
import { client } from '../client'

export class AccountRepository implements AddAccountRepository {
  async add (account: AccountParams): Promise<void> {
    await client.account.create({
      data: {
        name: account.name,
        email: account.email,
        password: account.password,
        is_barber: account.isBarber
      }
    })
  }
}