import { DbLoadByEmail } from './db-load-by-email'
import { LoadByEmailRepositoryStub } from '../../tests/mock-load-by-email-repository'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'

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
  test('Should call LoadAccountByEmailRepository with correct value', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.loadByEmail('any_email@mail.com')
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
