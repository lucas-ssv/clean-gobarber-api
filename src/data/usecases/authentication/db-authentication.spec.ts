import { DbAuthentication } from './db-authentication'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'
import { Account } from '../../../domain/models/account'
import { mockAccount } from '../../tests/db/mock-add-account-repository'
import { CompareStub } from '../../tests/criptography/mock-compare'
import { Compare } from '../../protocols/criptography/compare'

type SutTypes = {
  sut: DbAuthentication
  loadByEmailRepositoryStub: LoadByEmailRepository<Account>
  compareStub: Compare
}

class LoadByEmailRepositoryStub implements LoadByEmailRepository<Account> {
  async loadByEmail (email: string): Promise<Account> {
    return mockAccount()
  }
}

const makeSut = (): SutTypes => {
  const loadByEmailRepositoryStub = new LoadByEmailRepositoryStub()
  const compareStub = new CompareStub()
  const sut = new DbAuthentication(loadByEmailRepositoryStub, compareStub)
  return {
    sut,
    loadByEmailRepositoryStub,
    compareStub
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

  test('Should throw if LoadByEmailRepository throws', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.auth('any_email@mail.com', 'any_password')
    await expect(promise).rejects.toThrow()
  })

  test('Should call Compare with correct value', async () => {
    const { sut, compareStub } = makeSut()
    const compareSpy = jest.spyOn(compareStub, 'compare')
    await sut.auth('any_email@mail.com', 'any_password')
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })
})