import { DbLoadByEmail } from './db-load-by-email'
import { LoadByEmail } from '../../../domain/usecases/load-by-email'
import { Account } from '../../../domain/models/account'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'
import { mockAccount } from '../../tests/db/mock-add-account-repository'

type SutTypes = {
  sut: LoadByEmail<Account>
  loadByEmailRepositoryStub: LoadByEmailRepository<Account>
}

class LoadByEmailRepositoryStub implements LoadByEmailRepository<Account> {
  async loadByEmail (email: string): Promise<Account> {
    return mockAccount()
  }
}

const makeSut = (): SutTypes => {
  const loadByEmailRepositoryStub = new LoadByEmailRepositoryStub()
  const sut = new DbLoadByEmail(loadByEmailRepositoryStub)
  return {
    sut,
    loadByEmailRepositoryStub
  }
}

describe('DbLoadByEmail usecase', () => {
  test('Should call LoadByEmailRepository with correct value', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail')
    await sut.loadByEmail('any_email@mail.com')
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return null if no account found', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null) as any)
    const accountByEmail = await sut.loadByEmail('any_email@mail.com')
    expect(accountByEmail).toBeNull()
  })
})