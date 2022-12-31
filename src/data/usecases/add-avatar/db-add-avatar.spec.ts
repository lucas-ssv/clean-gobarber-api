import { DbAddAvatar } from './db-add-avatar'
import { Account } from '../../../domain/models/account'
import { mockAccount } from '../../../domain/tests/account/mock-account'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'
import { mockAddAvatarParams, mockAddAvatarResult } from '../../../domain/tests/avatar/mock-avatar'
import { AddAvatarRepositoryStub } from '../../tests/db/mock-add-avatar-repository'
import { AddAvatarRepository } from '../../protocols/db/add-avatar-repository'
import { UpdateAccountRepositoryStub } from '../../tests/db/mock-update-account-repository'
import { UpdateAccountRepository } from '../../protocols/db/update-account-repository'

type SutTypes = {
  sut: DbAddAvatar
  loadByEmailRepositoryStub: LoadByEmailRepository<Account>
  addAvatarRepositoryStub: AddAvatarRepository
  updateAccountRepositoryStub: UpdateAccountRepository
}

class LoadByEmailRepositoryStub implements LoadByEmailRepository<Account> {
  async loadByEmail (email: string): Promise<Account> {
    return mockAccount()
  }
}

const makeSut = (): SutTypes => {
  const loadByEmailRepositoryStub = new LoadByEmailRepositoryStub()
  const addAvatarRepositoryStub = new AddAvatarRepositoryStub()
  const updateAccountRepositoryStub = new UpdateAccountRepositoryStub()
  const sut = new DbAddAvatar(loadByEmailRepositoryStub, addAvatarRepositoryStub, updateAccountRepositoryStub)
  return {
    sut,
    loadByEmailRepositoryStub,
    addAvatarRepositoryStub,
    updateAccountRepositoryStub
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

  test('Should throw if AddAvatarRepository throws', async () => {
    const { sut, addAvatarRepositoryStub } = makeSut()
    jest.spyOn(addAvatarRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAddAvatarParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call UpdateAccountRepository with correct values', async () => {
    const mockAvatarParams = mockAddAvatarParams()
    const { sut, updateAccountRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateAccountRepositoryStub, 'update')
    await sut.add(mockAvatarParams)
    expect(updateSpy).toHaveBeenCalledWith({
      email: mockAvatarParams.email,
      avatarId: 'any_avatar_id'
    })
  })

  test('Should throw if UpdateAccountRepository throws', async () => {
    const { sut, updateAccountRepositoryStub } = makeSut()
    jest.spyOn(updateAccountRepositoryStub, 'update').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAddAvatarParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an avatar on success', async () => {
    const { sut } = makeSut()
    const avatar = await sut.add(mockAddAvatarParams())
    expect(avatar).toEqual(mockAddAvatarResult())
  })
})