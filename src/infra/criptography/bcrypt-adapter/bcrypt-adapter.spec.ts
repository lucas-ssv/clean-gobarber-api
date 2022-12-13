import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  hash: () => 'hashed_value'
}))

describe('BcryptAdapter', () => {
  test('Should call bcrypt with correct values', async () => {
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
})