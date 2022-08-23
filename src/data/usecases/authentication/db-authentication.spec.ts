import { DbAuthentication } from './db-authentication'
import { LoadByEmail } from '../../../domain/usecases/load-by-email'
import { Compare } from '../../protocols/criptography/compare'
import { mockAccount } from '../../tests/db/mock-account'
import { GenerateToken } from '../../protocols/criptography/generate-token'
import { LoadByEmailRepositoryStub } from '../../tests/db/mock-load-by-email-repository'
import { HashCompareStub } from '../../tests/criptography/mock-compare'
import { GenerateTokenStub } from '../../tests/criptography/mock-generate-token'

type SutTypes = {
  sut: DbAuthentication
  loadByEmailRepositoryStub: LoadByEmail
  hashCompareStub: Compare
  generateTokenStub: GenerateToken
}

const makeSut = (): SutTypes => {
  const loadByEmailRepositoryStub = new LoadByEmailRepositoryStub()
  const hashCompareStub = new HashCompareStub()
  const generateTokenStub = new GenerateTokenStub()
  const sut = new DbAuthentication(loadByEmailRepositoryStub, hashCompareStub, generateTokenStub)
  return {
    sut,
    loadByEmailRepositoryStub,
    hashCompareStub,
    generateTokenStub
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
})
