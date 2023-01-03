import { AddAccountRepository } from '../../../data/protocols/db/add-account-repository'
import { LoadAccountRepository } from '../../../data/protocols/db/load-account-repository'
import { LoadByEmailRepository } from '../../../data/protocols/db/load-by-email-repository'
import { UpdateAccountRepository } from '../../../data/protocols/db/update-account-repository'
import { Account } from '../../../domain/models/account'
import { LoadAccount } from '../../../domain/usecases/load-account'
import { client } from '../client'

export class AccountRepository implements AddAccountRepository, LoadAccountRepository, LoadByEmailRepository<Account>, UpdateAccountRepository {
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

  async load (id: string): Promise<LoadAccount.Result> {
    const account = await client.account.findUnique({
      where: {
        id
      },
      include: {
        avatar: true
      }
    })
    const { is_barber: isBarber, avatar_id, password, ...rest } = account as any
    return {
      ...rest,
      isBarber
    }
  }

  async loadByEmail (email: string): Promise<Account> {
    const accountByEmail = await client.account.findUnique({
      where: {
        email
      },
      include: {
        avatar: true
      }
    })
    return accountByEmail as any
  }

  async update (params: UpdateAccountRepository.Params): Promise<UpdateAccountRepository.Result> {
    const account = await client.account.update({
      where: {
        email: params.email
      },
      include: {
        avatar: true
      },
      data: {
        name: params.name,
        password: params.newPassword,
        avatar_id: params.avatarId
      }
    })
    const { is_barber: isBarber, avatar_id, ...rest } = account
    return {
      ...rest,
      isBarber
    } as any
  }
}