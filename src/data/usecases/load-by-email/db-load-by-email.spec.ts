import { DbLoadByEmail } from './db-load-by-email'
import { LoadByEmailRepositoryStub } from '../../tests/mock-load-by-email-repository'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'
import { mockAccount } from '../../tests/mock-account'
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

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toEqual(mockAccount())
  })
})
