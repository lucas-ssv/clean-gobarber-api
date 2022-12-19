import { DbAddAccount } from './db-add-account'
import { AddAccount } from '../../../domain/usecases/add-account'
import { AddAccountRepository } from '../../protocols/db/add-account-repository'
import { AddAccountRepositoryStub, mockAccountParams } from '../../tests/db/mock-add-account-repository'
import { EncrypterStub } from '../../tests/criptography/mock-encrypter'
import { Encrypter } from '../../protocols/criptography/encrypter'
import { LoadByEmailRepositoryStub } from '../../tests/db/mock-load-by-email-repository'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'
import { Account } from '../../../domain/models/account'
import { mockAccount } from '../../../domain/tests/account/mock-account'

type SutTypes = {
  sut: AddAccount
  addAccountRepositoryStub: AddAccountRepository
  encrypterStub: Encrypter
  loadByEmailRepositoryStub: LoadByEmailRepository<Account>
}

const makeSut = (): SutTypes => {
  const encrypterStub = new EncrypterStub()
  const addAccountRepositoryStub = new AddAccountRepositoryStub()
  const loadByEmailRepositoryStub = new LoadByEmailRepositoryStub()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub, loadByEmailRepositoryStub)
  return {
    sut,
    addAccountRepositoryStub,
    encrypterStub,
    loadByEmailRepositoryStub
  }
}

describe('DbAddAccount usecase', () => {
  test('Should call Encrypter with correct value', async () => {
    const mockAccount = mockAccountParams()
    const { sut, encrypterStub } = makeSut()
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.add(mockAccount)
    expect(encrypterSpy).toHaveBeenCalledWith(mockAccount.password)
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const mockAccount = mockAccountParams()
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(mockAccount)
    expect(addSpy).toHaveBeenCalledWith({
      ...mockAccount,
      password: 'hashed_password'
    })
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(mockAccountParams())
    expect(account).toEqual(mockAccount())
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadByEmailRepository with correct value', async () => {
    const mockAccount = mockAccountParams()
    const { sut, loadByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockAccount)
    expect(loadSpy).toHaveBeenCalledWith(mockAccount.email)
  })

  test('Should return null if LoadByEmailRepository returns an account', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockAccount()))
    const account = await sut.add(mockAccountParams())
    expect(account).toBeNull()
  })

  test('Should throw if LoadByEmailRepository throws', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAccountParams())
    await expect(promise).rejects.toThrow()
  })
})