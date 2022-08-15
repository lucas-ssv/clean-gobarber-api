import { DbLoadByEmail } from './db-load-by-email'
import { LoadByEmailRepositoryStub } from '../../tests/mock-load-by-email-repository'

describe('DbLoadByEmail', () => {
  test('Should call LoadAccountByEmailRepository with correct value', async () => {
    const loadAccountByEmailRepositoryStub = new LoadByEmailRepositoryStub()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    const sut = new DbLoadByEmail(loadAccountByEmailRepositoryStub)
    await sut.loadByEmail('any_email@mail.com')
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
