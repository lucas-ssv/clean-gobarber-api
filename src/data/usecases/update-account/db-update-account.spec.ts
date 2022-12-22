import { Account } from '../../../domain/models/account'
import { mockAccount } from '../../../domain/tests/account/mock-account'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'
import { DbUpdateAccount } from './db-update-account'

class LoadByEmailRepositoryStub implements LoadByEmailRepository<Account> {
  async loadByEmail (email: string): Promise<Account> {
    return mockAccount()
  }
}

describe('DbUpdateAccount usecase', () => {
  test('Should call LoadByEmailRepository with correct value', async () => {
    const loadByEmailRepositoryStub = new LoadByEmailRepositoryStub()
    const loadSpy = jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail')
    const sut = new DbUpdateAccount(loadByEmailRepositoryStub)
    await sut.update({
      name: 'any_name',
      email: 'any_email@mail.com',
      currentPassword: 'any_current_password',
      newPassword: 'any_new_password',
      newPasswordConfirmation: 'any_new_password'
    })
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})