import { DbLoadByEmail } from "./db-load-by-email"
import { LoadByEmailRepositoryStub } from "../../tests/db/mock-load-by-email-repository"

describe('DbLoadByEmail usecase', () => {
  test('Should call LoadByEmailRepository with correct value', async () => {
    const loadByEmailRepositoryStub = new LoadByEmailRepositoryStub()
    const loadSpy = jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail')
    const sut = new DbLoadByEmail(loadByEmailRepositoryStub)
    await sut.loadByEmail('any_email@mail.com')
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})