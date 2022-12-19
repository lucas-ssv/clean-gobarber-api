import { JwtAdapter } from './jwt-adapter'
import env from '../../../main/config/env'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  sign: () => 'any_token'
}))

describe('JwtAdapter', () => {
  test('Should call jwt.sign() with correct values', async () => {
    const sut = new JwtAdapter()
    const jwtSpy = jest.spyOn(jwt, 'sign')
    await sut.sign({
      name: 'any_name',
      email: 'any_email@mail.com'
    })
    expect(jwtSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com'
    }, env.secret, {
      expiresIn: env.expiresIn
    })
  })

  test('Should return a token on success', async () => {
    const sut = new JwtAdapter()
    const token = await sut.sign({
      name: 'any_name',
      email: 'any_email@mail.com'
    })
    expect(token).toBe('any_token')
  })
})