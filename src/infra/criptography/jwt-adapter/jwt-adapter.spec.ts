import { JwtAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const makeSut = (): JwtAdapter => new JwtAdapter()

describe('JwtAdapter', () => {
  test('Should call jwt.sign() with correct values', () => {
    const sut = makeSut()
    const jwtSpy = jest.spyOn(jwt, 'sign')
    sut.sign('any_value')
    expect(jwtSpy).toHaveBeenCalledWith({ id: 'any_value' }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    })
  })
})
