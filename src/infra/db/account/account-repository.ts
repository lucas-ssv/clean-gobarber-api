import { AddAccountRepository } from '../../../data/protocols/db/add-account-repository'
import { LoadByEmailRepository } from '../../../data/protocols/db/load-by-email-repository'
import { client } from '../client'

export class AccountRepository implements AddAccountRepository, LoadByEmailRepository {
  async add (account: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountData = await client.account.create({
      data: {
        name: account.name,
        email: account.email,
        password: account.password,
        is_barber: account.isBarber
      }
    })
    const result = { ...accountData, isBarber: accountData.is_barber }
    return result
  }

  async loadByEmail (email: string): Promise<LoadByEmailRepository.Result> {
    const accountByEmail = await client.account.findUnique({
      where: {
        email
      }
    })
    return accountByEmail as any
  }
}