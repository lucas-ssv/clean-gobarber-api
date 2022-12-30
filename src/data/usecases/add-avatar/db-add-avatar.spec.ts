import { DbAddAvatar } from './db-add-avatar'
import { Account } from '../../../domain/models/account'
import { mockAccount } from '../../../domain/tests/account/mock-account'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'
import { mockAddAvatarParams } from '../../../domain/tests/avatar/mock-avatar'

type SutTypes = {
  sut: DbAddAvatar
  loadByEmailRepositoryStub: LoadByEmailRepository<Account>
}

class LoadByEmailRepositoryStub implements LoadByEmailRepository<Account> {
  async loadByEmail (email: string): Promise<Account> {
    return mockAccount()
  }
}

const makeSut = (): SutTypes => {
  const loadByEmailRepositoryStub = new LoadByEmailRepositoryStub()
  const sut = new DbAddAvatar(loadByEmailRepositoryStub)
  return {
    sut,
    loadByEmailRepositoryStub
  }
}

describe('DbAddAvatar usecase', () => {
  test('Should call LoadByEmailRepository with correct value', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockAddAvatarParams())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if LoadByEmailRepository throws', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAddAvatarParams())
    await expect(promise).rejects.toThrow()
  })
})