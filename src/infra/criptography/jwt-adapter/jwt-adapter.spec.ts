import { JwtAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'
import env from '../../../main/config/env'

jest.mock('jsonwebtoken', () => ({
  sign: () => 'any_token'
}))

const makeSut = (): JwtAdapter => new JwtAdapter()

describe('JwtAdapter', () => {
  test('Should call jwt.sign() with correct values', async () => {
    const sut = makeSut()
    const jwtSpy = jest.spyOn(jwt, 'sign')
    await sut.sign('any_value')
    expect(jwtSpy).toHaveBeenCalledWith({ id: 'any_value' }, env.secret, {
      expiresIn: env.expiresIn
    })
  })

  test('Should return a token on success', async () => {
    const sut = makeSut()
    const token = await sut.sign('any_value')
    expect(token).toBe('any_token')
  })

  test('Should throw if jwt.sign() throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.sign('any_value')
    await expect(promise).rejects.toThrow()
  })
})
