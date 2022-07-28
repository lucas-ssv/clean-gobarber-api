import { BcryptAdapter } from './bcrypt-adapter'
import * as bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  hash: () => {
    return 'hashed_value'
  },
  compare: () => {
    return true
  }
}))

const makeSut = (): BcryptAdapter => new BcryptAdapter()

describe('BcryptAdapter', () => {
  describe('hash()', () => {
    test('Should call BcryptAdapter.hash() with correct values', async () => {
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

  describe('compare()', () => {
    test('Should call BcryptAdapter.compare() with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_value')
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_value')
    })

    test('Should return true if BcryptAdapter.compare() succeeds', async () => {
      const sut = makeSut()
      const isValidCompare = await sut.compare('any_value', 'any_value')
      expect(isValidCompare).toBeTruthy()
    })

    test('Should throw if compare throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.compare('any_value', 'any_value')
      await expect(promise).rejects.toThrow()
    })
  })
})
