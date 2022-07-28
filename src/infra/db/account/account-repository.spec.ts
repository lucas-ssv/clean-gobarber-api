import { AccountRepository } from './account-repository'
import { Account } from '../database/entities/account'
import { DbHelper } from '../helpers/db-helper'

describe('AccountRepository', () => {
  beforeAll(async () => {
    await DbHelper.connect()
  })

  afterAll(async () => {
    await DbHelper.clear(Account)
  })

  test('Should return an account on add success', async () => {
    const sut = new AccountRepository()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      isBarber: false
    })
    expect(account).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
    expect(account.isBarber).toBe(false)
  })
})
