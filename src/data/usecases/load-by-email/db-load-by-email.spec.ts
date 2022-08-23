import { DbLoadByEmail } from './db-load-by-email'
import { LoadByEmailRepositoryStub } from '../../tests/db/mock-load-by-email-repository'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'
import { mockAccount } from '../../tests/db/mock-account'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbLoadByEmail
  loadAccountByEmailRepositoryStub: LoadByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = new LoadByEmailRepositoryStub()
  const sut = new DbLoadByEmail(loadAccountByEmailRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbLoadByEmail', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadAccountByEmailRepository with correct value', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.loadByEmail('any_email@mail.com')
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.loadByEmail('any_email@mail.com')
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if not find the email provided', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeNull()
  })

  test('Should return an account if LoadByEmail succeeds', async () => {
    const { sut } = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toEqual(mockAccount())
  })
})
