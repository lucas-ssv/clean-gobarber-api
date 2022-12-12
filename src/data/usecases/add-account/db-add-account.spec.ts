import { DbAddAccount } from './db-add-account'
import { AddAccount } from '../../../domain/usecases/add-account'
import { AddAccountRepository } from '../../protocols/db/add-account-repository'
import { AddAccountRepositoryStub } from '../../tests/db/mock-add-account-repository'

type SutTypes = {
  sut: AddAccount
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = new AddAccountRepositoryStub()
  const sut = new DbAddAccount(addAccountRepositoryStub)
  return {
    sut,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount usecase', () => {
  test('Should call AddAccountRepository with correct values', async () => {
    const account = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      isBarber: false
    }
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(account)
    expect(addSpy).toHaveBeenCalledWith(account)
  })
})