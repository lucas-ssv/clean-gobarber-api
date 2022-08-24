import { AccountRepository } from './account-repository'
import { Account } from '../database/entities/account'
import { connect } from '../../test/mock-pg-mem'
import { DataSource } from 'typeorm'
import { DbHelper } from '../helpers/db-helper'

let client: DataSource = null

const makeSut = (): AccountRepository => new AccountRepository()

describe('AccountRepository', () => {
  beforeAll(async () => {
    client = await (await connect(Account)).initialize()
  })

  afterAll(async () => {
    await client.destroy()
  })

  test('Should return an account on add success', async () => {
    const sut = makeSut()
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

  test('Should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeTruthy()
    expect(account.email).toBe('any_email@mail.com')
  })

  test('Should refresh the account access token on RefreshToken success', async () => {
    const sut = makeSut()
    const repo = await DbHelper.getRepository(Account)
    const result = await repo.insert({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password',
      isBarber: false
    } as any)
    await sut.refresh('any_token', result.identifiers[0].id)
    const account = await repo.findOne({ where: { id: result.identifiers[0].id } })
    expect(account).toBeTruthy()
    expect(account.accessToken).toBe('any_token')
  })
})
