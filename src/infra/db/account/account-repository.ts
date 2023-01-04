import { AddAccountRepository } from '../../../data/protocols/db/add-account-repository'
import { LoadAccountRepository } from '../../../data/protocols/db/load-account-repository'
import { LoadAccountsRepository } from '../../../data/protocols/db/load-accounts-repository'
import { LoadByEmailRepository } from '../../../data/protocols/db/load-by-email-repository'
import { UpdateAccountRepository } from '../../../data/protocols/db/update-account-repository'
import { Account } from '../../../domain/models/account'
import { LoadAccounts } from '../../../domain/usecases/load-accounts'
import { client } from '../client'
import { loadAccountHelper } from '../helpers/prisma-helper'

export class AccountRepository implements AddAccountRepository, LoadAccountRepository, LoadAccountsRepository, LoadByEmailRepository<Account>, UpdateAccountRepository {
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

  async load (id: string): Promise<LoadAccountRepository.Result> {
    const account = await client.account.findUnique({
      where: {
        id
      },
      include: {
        avatar: true
      }
    })
    return account?.id && loadAccountHelper(account as any) as any
  }

  async loadAll (params: LoadAccounts.Params): Promise<LoadAccountsRepository.Result> {
    const result = await client.account.findMany({
      where: {
        is_barber: params.isBarber
      },
      include: {
        avatar: true
      }
    })
    const accounts = result.map(account => ({
      id: account.id,
      name: account.name,
      email: account.email,
      password: account.password,
      isBarber: account.is_barber,
      avatar: account.avatar
    }))
    return accounts as any
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
        id: params.id
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