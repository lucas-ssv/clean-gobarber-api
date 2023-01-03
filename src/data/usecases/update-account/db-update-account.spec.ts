import { mockUpdateAccountParams } from '../../../domain/tests/account/mock-update-account'
import { Compare } from '../../protocols/criptography/compare'
import { Encrypter } from '../../protocols/criptography/encrypter'
import { LoadAccountRepository } from '../../protocols/db/load-account-repository'
import { UpdateAccountRepository } from '../../protocols/db/update-account-repository'
import { CompareStub } from '../../tests/criptography/mock-compare'
import { EncrypterStub } from '../../tests/criptography/mock-encrypter'
import { LoadAccountRepositoryStub } from '../../tests/db/mock-load-account-repository'
import { UpdateAccountRepositoryStub } from '../../tests/db/mock-update-account-repository'
import { DbUpdateAccount } from './db-update-account'

type SutTypes = {
  sut: DbUpdateAccount
  loadAccountRepositoryStub: LoadAccountRepository
  compareStub: Compare
  encrypterStub: Encrypter
  updateAccountRepositoryStub: UpdateAccountRepository
}

const makeSut = (): SutTypes => {
  const loadAccountRepositoryStub = new LoadAccountRepositoryStub()
  const compareStub = new CompareStub()
  const encrypterStub = new EncrypterStub()
  const updateAccountRepositoryStub = new UpdateAccountRepositoryStub()
  const sut = new DbUpdateAccount(loadAccountRepositoryStub, compareStub, encrypterStub, updateAccountRepositoryStub)
  return {
    sut,
    loadAccountRepositoryStub,
    compareStub,
    encrypterStub,
    updateAccountRepositoryStub
  }
}

describe('DbUpdateAccount usecase', () => {
  test('Should call LoadAccountRepository with correct value', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountRepositoryStub, 'load')
    await sut.update(mockUpdateAccountParams())
    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return null if no account was found', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()
    jest.spyOn(loadAccountRepositoryStub, 'load').mockReturnValueOnce(Promise.resolve(null) as any)
    const account = await sut.update(mockUpdateAccountParams())
    expect(account).toBeNull()
  })

  test('Should throw if LoadAccountRepository throws', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()
    jest.spyOn(loadAccountRepositoryStub, 'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.update(mockUpdateAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call Compare with correct values', async () => {
    const { sut, compareStub } = makeSut()
    const compareSpy = jest.spyOn(compareStub, 'compare')
    await sut.update(mockUpdateAccountParams())
    expect(compareSpy).toHaveBeenCalledWith(mockUpdateAccountParams().currentPassword, 'hashed_password')
  })

  test('Should throw if Compare throws', async () => {
    const { sut, compareStub } = makeSut()
    jest.spyOn(compareStub, 'compare').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.update(mockUpdateAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call Encrypter with correct value', async () => {
    const { sut, encrypterStub } = makeSut()
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.update(mockUpdateAccountParams())
    expect(encrypterSpy).toHaveBeenCalledWith(mockUpdateAccountParams().newPassword)
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.update(mockUpdateAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call UpdateAccountRepository with correct values', async () => {
    const { sut, updateAccountRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateAccountRepositoryStub, 'update')
    const mockUpdateAccount = mockUpdateAccountParams()
    await sut.update(mockUpdateAccount)
    expect(updateSpy).toHaveBeenCalledWith({
      id: mockUpdateAccount.id,
      name: mockUpdateAccount.name,
      currentPassword: mockUpdateAccount.currentPassword,
      newPassword: 'hashed_password'
    })
  })

  test('Should not update account password if current password is not provided', async () => {
    const { sut, updateAccountRepositoryStub } = makeSut()
    jest.spyOn(updateAccountRepositoryStub, 'update').mockReturnValueOnce(Promise.resolve({
      id: 'any_id',
      name: 'updated_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      isBarber: false
    }))
    const account = await sut.update({
      id: 'any_id',
      name: 'updated_name',
    })
    expect(account).toEqual({
      id: 'any_id',
      name: 'updated_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      isBarber: false
    })
  })

  test('Should return an updated account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.update(mockUpdateAccountParams())
    expect(account).toEqual({
      id: 'any_id',
      name: 'updated_name',
      email: 'any_email@mail.com',
      password: 'updated_password',
      isBarber: false
    })
  })

  test('Should throw if UpdateAccountRepository throws', async () => {
    const { sut, updateAccountRepositoryStub } = makeSut()
    jest.spyOn(updateAccountRepositoryStub, 'update').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.update(mockUpdateAccountParams())
    await expect(promise).rejects.toThrow()
  })
})