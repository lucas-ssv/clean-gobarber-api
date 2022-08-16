import { DbAuthentication } from './db-authentication'
import { LoadByEmailRepositoryStub } from '../../tests/mock-load-by-email-repository'
import { LoadByEmail } from '../../../domain/usecases/load-by-email'

type SutTypes = {
  sut: DbAuthentication
  loadByEmailRepositoryStub: LoadByEmail
}

const makeSut = (): SutTypes => {
  const loadByEmailRepositoryStub = new LoadByEmailRepositoryStub()
  const sut = new DbAuthentication(loadByEmailRepositoryStub)
  return {
    sut,
    loadByEmailRepositoryStub
  }
}

describe('DbAuthentication', () => {
  test('Should call LoadByEmailRepository with correct value', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail')
    await sut.auth('any_email@mail.com', 'any_password')
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
