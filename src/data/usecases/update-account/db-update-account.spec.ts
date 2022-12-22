import { Account } from '../../../domain/models/account'
import { mockAccount } from '../../../domain/tests/account/mock-account'
import { mockUpdateAccountParams } from '../../../domain/tests/account/mock-update-account'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'
import { DbUpdateAccount } from './db-update-account'

type SutTypes = {
  sut: DbUpdateAccount
  loadByEmailRepositoryStub: LoadByEmailRepository<Account>
}

class LoadByEmailRepositoryStub implements LoadByEmailRepository<Account> {
  async loadByEmail (email: string): Promise<Account> {
    return mockAccount()
  }
}

const makeSut = (): SutTypes => {
  const loadByEmailRepositoryStub = new LoadByEmailRepositoryStub()
  const sut = new DbUpdateAccount(loadByEmailRepositoryStub)
  return {
    sut,
    loadByEmailRepositoryStub
  }
}

describe('DbUpdateAccount usecase', () => {
  test('Should call LoadByEmailRepository with correct value', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail')
    await sut.update(mockUpdateAccountParams())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if LoadByEmailRepository throws', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.update(mockUpdateAccountParams())
    await expect(promise).rejects.toThrow()
  })
})