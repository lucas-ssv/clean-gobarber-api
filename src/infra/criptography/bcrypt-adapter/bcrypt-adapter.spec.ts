import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

describe('BcryptAdapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = new BcryptAdapter()
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_password')
    expect(bcryptSpy).toHaveBeenCalledWith('any_password', 12)
  })
})