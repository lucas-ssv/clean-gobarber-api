import { DbAddAccount } from "./db-add-account"
import { AddAccountRepositoryStub } from "../../tests/db/mock-add-account-repository"

describe('DbAddAccount usecase', () => {
  test('Should call AddAccountRepository with correct values', async () => {
    const account = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      isBarber: false
    }
    const addAccountRepositoryStub = new AddAccountRepositoryStub()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const sut = new DbAddAccount(addAccountRepositoryStub)
    await sut.add(account)
    expect(addSpy).toHaveBeenCalledWith(account)
  })
})