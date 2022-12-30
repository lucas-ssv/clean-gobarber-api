import { DbAddAvatar } from './db-add-avatar'
import { Account } from '../../../domain/models/account'
import { mockAccount } from '../../../domain/tests/account/mock-account'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'

class LoadByEmailRepositoryStub implements LoadByEmailRepository<Account> {
  async loadByEmail (email: string): Promise<Account> {
    return mockAccount()
  }
}

describe('DbAddAvatar usecase', () => {
  test('Should call LoadByEmailRepository with correct value', async () => {
    const loadByEmailRepositoryStub = new LoadByEmailRepositoryStub()
    const loadSpy = jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail')
    const sut = new DbAddAvatar(loadByEmailRepositoryStub)
    await sut.add({
      email: 'any_email@mail.com',
      name: 'any_name',
      url: 'any_url'
    })
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})