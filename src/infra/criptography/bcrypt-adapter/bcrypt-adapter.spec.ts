import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

describe('BcryptAdapter', () => {
  test('Should call BcryptAdapter with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
