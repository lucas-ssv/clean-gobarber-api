import { DbAuthentication } from './db-authentication'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'
import { Account } from '../../../domain/models/account'
import { CompareStub } from '../../tests/criptography/mock-compare'
import { Compare } from '../../protocols/criptography/compare'
import { SignerStub } from '../../tests/criptography/mock-signer'
import { Signer } from '../../protocols/criptography/signer'
import { mockAccount } from '../../../domain/tests/account/mock-account'

type SutTypes = {
  sut: DbAuthentication
  loadByEmailRepositoryStub: LoadByEmailRepository<Account>
  compareStub: Compare
  signerStub: Signer
}

class LoadByEmailRepositoryStub implements LoadByEmailRepository<Account> {
  async loadByEmail (email: string): Promise<Account> {
    return mockAccount()
  }
}

const makeSut = (): SutTypes => {
  const loadByEmailRepositoryStub = new LoadByEmailRepositoryStub()
  const compareStub = new CompareStub()
  const signerStub = new SignerStub()
  const sut = new DbAuthentication(loadByEmailRepositoryStub, compareStub, signerStub)
  return {
    sut,
    loadByEmailRepositoryStub,
    compareStub,
    signerStub
  }
}

describe('DbAuthentication usecase', () => {
  test('Should call LoadByEmailRepository with correct value', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail')
    await sut.auth('any_email@mail.com', 'any_password')
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return null if there is no account', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null) as any)
    const authAccount = await sut.auth('any_email@mail.com', 'any_password')
    expect(authAccount).toBeNull()
  })

  test('Should throw if LoadByEmailRepository throws', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.auth('any_email@mail.com', 'any_password')
    await expect(promise).rejects.toThrow()
  })

  test('Should call Compare with correct value', async () => {
    const { sut, compareStub } = makeSut()
    const compareSpy = jest.spyOn(compareStub, 'compare')
    await sut.auth('any_email@mail.com', 'any_password')
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('Should return null if Compare is not valid', async () => {
    const { sut, compareStub } = makeSut()
    jest.spyOn(compareStub, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const authAccount = await sut.auth('any_email@mail.com', 'any_password')
    expect(authAccount).toBeNull()
  })

  test('Should throw if Compare throws', async () => {
    const { sut, compareStub } = makeSut()
    jest.spyOn(compareStub, 'compare').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.auth('any_email@mail.com', 'any_password')
    await expect(promise).rejects.toThrow()
  })

  test('Should call Signer with correct value', async () => {
    const { sut, signerStub } = makeSut()
    const signerSpy = jest.spyOn(signerStub, 'sign')
    await sut.auth('any_email@mail.com', 'any_password')
    expect(signerSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com'
    })
  })

  test('Should throw if Signer throws', async () => {
    const { sut, signerStub } = makeSut()
    jest.spyOn(signerStub, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.auth('any_email@mail.com', 'any_password')
    await expect(promise).rejects.toThrow()
  })

  test('Should return an auth account on success', async () => {
    const { sut } = makeSut()
    const authAccount = await sut.auth('any_email@mail.com', 'any_password')
    expect(authAccount).toEqual({
      id: 'any_id',
      token: 'any_token'
    })
  })
})