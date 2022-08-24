import { JwtAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

describe('JwtAdapter', () => {
  test('Should call jwt.sign() with correct values', () => {
    const sut = new JwtAdapter()
    const jwtSpy = jest.spyOn(jwt, 'sign')
    sut.sign('any_value')
    expect(jwtSpy).toHaveBeenCalledWith({ id: 'any_value' }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    })
  })
})
