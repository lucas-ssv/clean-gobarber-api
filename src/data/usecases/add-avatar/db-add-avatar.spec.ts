import { DbAddAvatar } from './db-add-avatar'
import { mockAddAvatarParams, mockAddAvatarResult } from '../../../domain/tests/avatar/mock-avatar'
import { AddAvatarRepositoryStub } from '../../tests/db/mock-add-avatar-repository'
import { AddAvatarRepository } from '../../protocols/db/add-avatar-repository'
import { UpdateAccountRepositoryStub } from '../../tests/db/mock-update-account-repository'
import { UpdateAccountRepository } from '../../protocols/db/update-account-repository'
import { LoadAccountRepositoryStub } from '../../tests/db/mock-load-account-repository'
import { LoadAccountRepository } from '../../protocols/db/load-account-repository'

type SutTypes = {
  sut: DbAddAvatar
  loadAccountRepositoryStub: LoadAccountRepository
  addAvatarRepositoryStub: AddAvatarRepository
  updateAccountRepositoryStub: UpdateAccountRepository
}

const makeSut = (): SutTypes => {
  const loadAccountRepositoryStub = new LoadAccountRepositoryStub()
  const addAvatarRepositoryStub = new AddAvatarRepositoryStub()
  const updateAccountRepositoryStub = new UpdateAccountRepositoryStub()
  const sut = new DbAddAvatar(loadAccountRepositoryStub, addAvatarRepositoryStub, updateAccountRepositoryStub)
  return {
    sut,
    loadAccountRepositoryStub,
    addAvatarRepositoryStub,
    updateAccountRepositoryStub
  }
}

describe('DbAddAvatar usecase', () => {
  test('Should call LoadAccountRepository with correct value', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountRepositoryStub, 'load')
    await sut.add(mockAddAvatarParams())
    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return null if no account was found', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()
    jest.spyOn(loadAccountRepositoryStub, 'load').mockReturnValueOnce(Promise.resolve(null) as any)
    const avatar = await sut.add(mockAddAvatarParams())
    expect(avatar).toBeNull()
  })

  test('Should throw if LoadByEmailRepository throws', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()
    jest.spyOn(loadAccountRepositoryStub, 'load').mockImplementationOnce(() => {
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
      id: 'any_id',
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