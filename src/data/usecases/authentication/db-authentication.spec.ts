import { DbAuthentication } from './db-authentication'
import { LoadByEmailRepositoryStub } from '../../tests/db/mock-load-by-email-repository'

describe('DbAuthentication', () => {
  test('Should call LoadByEmailRepository with correct value', async () => {
    const loadByEmailRepositoryStub = new LoadByEmailRepositoryStub()
    const loadSpy = jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail')
    const sut = new DbAuthentication(loadByEmailRepositoryStub)
    await sut.auth('any_email@mail.com', 'any_password')
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})