import { DbAddAccount } from './db-add-account'
import { AddAccountRepositoryStub, mockFakeAddAccountParams } from '../../tests/mock-add-account-repository'
import { AddAccountRepository } from '../../protocols/db/add-account-repository'
import { Encrypter } from '../../protocols/criptography/encrypter'
import { EncrypterStub } from '../../tests/mock-encrypter'
import { LoadByEmailRepositoryStub } from '../../tests/mock-load-by-email-repository'
import MockDate from 'mockdate'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'

type SutTypes = {
  sut: DbAddAccount
  addAccountRepositoryStub: AddAccountRepository
  encrypterStub: Encrypter
  loadByEmailRepositoryStub: LoadByEmailRepository
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = new AddAccountRepositoryStub()
  const encrypterStub = new EncrypterStub()
  const loadByEmailRepositoryStub = new LoadByEmailRepositoryStub()
  const sut = new DbAddAccount(addAccountRepositoryStub, encrypterStub, loadByEmailRepositoryStub)
  return {
    sut,
    addAccountRepositoryStub,
    encrypterStub,
    loadByEmailRepositoryStub
  }
}

describe('DbAddAccount usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call Encrypter with correct values', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'hash')
    const fakeAddAccountRequest = mockFakeAddAccountParams()
    await sut.add(fakeAddAccountRequest)
    expect(encryptSpy).toHaveBeenCalledWith(fakeAddAccountRequest.password)
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockFakeAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const fakeAddAccountRequest = mockFakeAddAccountParams()
    await sut.add(fakeAddAccountRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password',
      isBarber: false
    })
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const newAccount = await sut.add(mockFakeAddAccountParams())
    expect(newAccount).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password',
      isBarber: false,
      createdAt: new Date()
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockFakeAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadByEmailRepository with correct value', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockFakeAddAccountParams())
    expect(loadSpy).toHaveBeenCalledWith(mockFakeAddAccountParams().email)
  })
})
