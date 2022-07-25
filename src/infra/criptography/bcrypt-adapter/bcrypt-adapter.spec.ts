import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  hash: () => {
    return 'hashed_value'
  }
}))

const makeSut = (): BcryptAdapter => new BcryptAdapter()

describe('BcryptAdapter', () => {
  test('Should call BcryptAdapter with correct values', async () => {
    const salt = 12
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash if encrypter succeeds', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hashed_value')
  })

  test('Should throws if hash throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })
})
