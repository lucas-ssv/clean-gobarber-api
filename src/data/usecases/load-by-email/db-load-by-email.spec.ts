import { DbLoadByEmail } from './db-load-by-email'
import { LoadByEmailRepositoryStub } from '../../tests/db/mock-load-by-email-repository'
import { LoadByEmail } from '../../../domain/usecases/load-by-email'
import { Account } from '../../../domain/models/account'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'

type SutTypes = {
  sut: LoadByEmail<Account>
  loadByEmailRepositoryStub: LoadByEmailRepository<Account>
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
})