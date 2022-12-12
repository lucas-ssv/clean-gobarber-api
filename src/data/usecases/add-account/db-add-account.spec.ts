import { DbAddAccount } from './db-add-account'
import { AddAccount } from '../../../domain/usecases/add-account'
import { AddAccountRepository } from '../../protocols/db/add-account-repository'
import { AddAccountRepositoryStub, mockAccountParams } from '../../tests/db/mock-add-account-repository'
import { EncrypterStub } from '../../tests/criptography/mock-encrypter'
import { Encrypter } from '../../protocols/criptography/encrypter'

type SutTypes = {
  sut: AddAccount
  addAccountRepositoryStub: AddAccountRepository
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  const encrypterStub = new EncrypterStub()
  const addAccountRepositoryStub = new AddAccountRepositoryStub()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
  return {
    sut,
    addAccountRepositoryStub,
    encrypterStub
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
    expect(addSpy).toHaveBeenCalledWith(mockAccount)
  })
})