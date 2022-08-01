import { Account } from '../database/entities/account'
import { DbHelper } from './db-helper'

describe('DbHelper', () => {
  test('Should reconnect if database is down', async () => {
    let accountRepository = await DbHelper.getRepository(Account)
    expect(accountRepository).toBeTruthy()
    await DbHelper.disconnect()
    accountRepository = await DbHelper.getRepository(Account)
    expect(accountRepository).toBeTruthy()
  })
})
