import { DbAuthentication } from './db-authentication'
import { LoadByEmail } from '../../../domain/usecases/load-by-email'
import { Compare } from '../../protocols/criptography/compare'
import { mockAccount } from '../../tests/db/mock-account'
import { GenerateToken } from '../../protocols/criptography/generate-token'
import { LoadByEmailRepositoryStub } from '../../tests/db/mock-load-by-email-repository'
import { HashCompareStub } from '../../tests/criptography/mock-compare'
import { GenerateTokenStub } from '../../tests/criptography/mock-generate-token'
import { RefreshTokenRepository } from '../../protocols/db/refresh-token-repository'
import { RefreshTokenRepositoryStub } from '../../tests/db/mock-refresh-token-repository'
import { mockAuthAccount } from '../../tests/db/mock-auth-account'

type SutTypes = {
  sut: DbAuthentication
  loadByEmailRepositoryStub: LoadByEmail
  hashCompareStub: Compare
  generateTokenStub: GenerateToken
  refreshTokenRepositoryStub: RefreshTokenRepository
}

const makeSut = (): SutTypes => {
  const loadByEmailRepositoryStub = new LoadByEmailRepositoryStub()
  const hashCompareStub = new HashCompareStub()
  const generateTokenStub = new GenerateTokenStub()
  const refreshTokenRepositoryStub = new RefreshTokenRepositoryStub()
  const sut = new DbAuthentication(loadByEmailRepositoryStub, hashCompareStub, generateTokenStub, refreshTokenRepositoryStub)
  return {
    sut,
    loadByEmailRepositoryStub,
    hashCompareStub,
    generateTokenStub,
    refreshTokenRepositoryStub
  }
}

describe('DbAuthentication', () => {
  test('Should call LoadByEmailRepository with correct value', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail')
    await sut.auth('any_email@mail.com', 'any_password')
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if LoadByEmailRepository throws', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.auth('any_email@mail.com', 'any_password')
    await expect(promise).rejects.toThrow()
  })

  test('Should call HashCompare with correct values', async () => {
    const { sut, hashCompareStub, loadByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockAccount()))
    const hashSpy = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth('any_email@mail.com', 'any_password')
    expect(hashSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('Should throw if HashCompare throws', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.auth('any_email@mail.com', 'any_password')
    await expect(promise).rejects.toThrow()
  })

  test('Should call GenerateToken with correct values', async () => {
    const { sut, generateTokenStub } = makeSut()
    const generateSpy = jest.spyOn(generateTokenStub, 'generate')
    await sut.auth('any_email@mail.com', 'any_password')
    expect(generateSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if GenerateToken throws', async () => {
    const { sut, generateTokenStub } = makeSut()
    jest.spyOn(generateTokenStub, 'generate').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.auth('any_email@mail.com', 'any_password')
    await expect(promise).rejects.toThrow()
  })

  test('Should call RefreshTokenRepository with correct values', async () => {
    const { sut, refreshTokenRepositoryStub } = makeSut()
    const refreshSpy = jest.spyOn(refreshTokenRepositoryStub, 'refreshToken')
    await sut.auth('any_email@mail.com', 'any_password')
    expect(refreshSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('Should throw if RefreshTokenRepository throws', async () => {
    const { sut, refreshTokenRepositoryStub } = makeSut()
    jest.spyOn(refreshTokenRepositoryStub, 'refreshToken').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.auth('any_email@mail.com', 'any_password')
    await expect(promise).rejects.toThrow()
  })

  test('Should return an auth account on success', async () => {
    const { sut } = makeSut()
    const authAccount = await sut.auth('any_email@mail.com', 'any_password')
    expect(authAccount).toEqual(mockAuthAccount())
  })

  test('Should return null if no account exists', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    const authAccount = await sut.auth('any_email@mail.com', 'any_password')
    expect(authAccount).toBeNull()
  })
})
