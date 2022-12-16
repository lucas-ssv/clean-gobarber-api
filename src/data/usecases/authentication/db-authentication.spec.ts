import { DbAuthentication } from './db-authentication'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'
import { Account } from '../../../domain/models/account'
import { mockAccount } from '../../tests/db/mock-add-account-repository'

type SutTypes = {
  sut: DbAuthentication
  loadByEmailRepositoryStub: LoadByEmailRepository<Account>
}

class LoadByEmailRepositoryStub implements LoadByEmailRepository<Account> {
  async loadByEmail (email: string): Promise<Account> {
    return mockAccount()
  }
}

const makeSut = (): SutTypes => {
  const loadByEmailRepositoryStub = new LoadByEmailRepositoryStub()
  const sut = new DbAuthentication(loadByEmailRepositoryStub)
  return {
    sut,
    loadByEmailRepositoryStub
  }
}

describe('DbAuthentication usecase', () => {
  test('Should call LoadByEmailRepository with correct value', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail')
    await sut.auth('any_email@mail.com', 'any_password')
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return null if there is no account', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null) as any)
    const account = await sut.auth('any_email@mail.com', 'any_password')
    expect(account).toBeNull()
  })
})