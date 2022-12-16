import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  hash: () => 'hashed_value',
  compare: () => true
}))

describe('BcryptAdapter', () => {
  describe('hash()', () => {
    test('Should call bcrypt.hash() with correct values', async () => {
      const sut = new BcryptAdapter()
      const bcryptSpy = jest.spyOn(bcrypt, 'hash')
      await sut.encrypt('any_value')
      expect(bcryptSpy).toHaveBeenCalledWith('any_value', 12)
    })
  
    test('Should return a hashed value on success', async () => {
      const sut = new BcryptAdapter()
      const hash = await sut.encrypt('any_value')
      expect(hash).toBe('hashed_value')
    })
  
    test('Should throw if hash throws', async () => {
      const sut = new BcryptAdapter()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.encrypt('any_value')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('compare()', () => {
    test('Should call bcrypt.compare() with correct values', async () => {
      const sut = new BcryptAdapter()
      const bcryptSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_value_to_compare')
      expect(bcryptSpy).toHaveBeenCalledWith('any_value', 'any_value_to_compare')
    })

    test('Should return true if bcrypt.compare() succeeds', async () => {
      const sut = new BcryptAdapter()
      const isCompareMatch = await sut.compare('any_value', 'any_value_to_compare')
      expect(isCompareMatch).toBeTruthy()
    })

    test('Should throw if compare throws', async () => {
      const sut = new BcryptAdapter()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.compare('any_value', 'any_value_to_compare')
      await expect(promise).rejects.toThrow()
    })
  })
})