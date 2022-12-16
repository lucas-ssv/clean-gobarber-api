import { Account } from '../../../domain/models/account'
import { AuthAccount } from '../../../domain/models/auth-account'
import { Authentication } from '../../../domain/usecases/authentication'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadByEmailRepository: LoadByEmailRepository<Account>) {}

  async auth (email: string, password: string): Promise<AuthAccount> {
    await this.loadByEmailRepository.loadByEmail(email)
    return null as any
  }
}