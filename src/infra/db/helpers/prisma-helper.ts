import { LoadAccountRepository } from '../../../data/protocols/db/load-account-repository'
import { Account } from '../../../domain/models/account'

export const loadAccountHelper = (account: Account): LoadAccountRepository.Result => {
  const { is_barber: isBarber, avatar_id, ...rest } = account as any
  return {
    ...rest,
    isBarber
  }
}