import { Account } from '../../../domain/models/account'
import { mockAccount } from '../../../domain/tests/account/mock-account'
import { mockUpdateAccountParams } from '../../../domain/tests/account/mock-update-account'
import { Compare } from '../../protocols/criptography/compare'
import { Encrypter } from '../../protocols/criptography/encrypter'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'
import { UpdateAccountRepository } from '../../protocols/db/update-account-repository'
import { CompareStub } from '../../tests/criptography/mock-compare'
import { EncrypterStub } from '../../tests/criptography/mock-encrypter'
import { UpdateAccountRepositoryStub } from '../../tests/db/mock-update-account-repository'
import { DbUpdateAccount } from './db-update-account'

type SutTypes = {
  sut: DbUpdateAccount
  loadByEmailRepositoryStub: LoadByEmailRepository<Account>
  compareStub: Compare
  encrypterStub: Encrypter
  updateAccountRepositoryStub: UpdateAccountRepository
}

class LoadByEmailRepositoryStub implements LoadByEmailRepository<Account> {
  async loadByEmail (email: string): Promise<Account> {
    return mockAccount()
  }
}

const makeSut = (): SutTypes => {
  const loadByEmailRepositoryStub = new LoadByEmailRepositoryStub()
  const compareStub = new CompareStub()
  const encrypterStub = new EncrypterStub()
  const updateAccountRepositoryStub = new UpdateAccountRepositoryStub()
  const sut = new DbUpdateAccount(loadByEmailRepositoryStub, compareStub, encrypterStub, updateAccountRepositoryStub)
  return {
    sut,
    loadByEmailRepositoryStub,
    compareStub,
    encrypterStub,
    updateAccountRepositoryStub
  }
}

describe('DbUpdateAccount usecase', () => {
  test('Should call LoadByEmailRepository with correct value', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail')
    await sut.update(mockUpdateAccountParams())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return null if no account was found', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null) as any)
    const account = await sut.update(mockUpdateAccountParams())
    expect(account).toBeNull()
  })

  test('Should throw if LoadByEmailRepository throws', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(() => {
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
      name: mockUpdateAccount.name,
      email: mockUpdateAccount.email,
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
      name: 'updated_name',
      email: 'any_email@mail.com'
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