import { DbAddAvatar } from './db-add-avatar'
import { Account } from '../../../domain/models/account'
import { mockAccount } from '../../../domain/tests/account/mock-account'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'
import { mockAddAvatarParams } from '../../../domain/tests/avatar/mock-avatar'
import { AddAvatarRepositoryStub } from '../../tests/db/mock-add-avatar-repository'
import { AddAvatarRepository } from '../../protocols/db/add-avatar-repository'

type SutTypes = {
  sut: DbAddAvatar
  loadByEmailRepositoryStub: LoadByEmailRepository<Account>
  addAvatarRepositoryStub: AddAvatarRepository
}

class LoadByEmailRepositoryStub implements LoadByEmailRepository<Account> {
  async loadByEmail (email: string): Promise<Account> {
    return mockAccount()
  }
}

const makeSut = (): SutTypes => {
  const loadByEmailRepositoryStub = new LoadByEmailRepositoryStub()
  const addAvatarRepositoryStub = new AddAvatarRepositoryStub()
  const sut = new DbAddAvatar(loadByEmailRepositoryStub, addAvatarRepositoryStub)
  return {
    sut,
    loadByEmailRepositoryStub,
    addAvatarRepositoryStub
  }
}

describe('DbAddAvatar usecase', () => {
  test('Should call LoadByEmailRepository with correct value', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockAddAvatarParams())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return null if no account was found', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null) as any)
    const avatar = await sut.add(mockAddAvatarParams())
    expect(avatar).toBeNull()
  })

  test('Should throw if LoadByEmailRepository throws', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAddAvatarParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAvatarRepository with correct values', async () => {
    const { sut, addAvatarRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAvatarRepositoryStub, 'add')
    const mockAvatar = mockAddAvatarParams()
    await sut.add(mockAvatar)
    expect(addSpy).toHaveBeenCalledWith({
      name: mockAvatar.name,
      url: mockAvatar.url
    })
  })
})