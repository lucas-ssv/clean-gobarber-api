import { AccountRepository } from './account-repository'
import { Account } from '../database/entities/account'
import { DataSource } from 'typeorm'
import { newDb } from 'pg-mem'

let client: DataSource = null
const db = newDb()
const connect = async (): Promise<DataSource> => {
  db.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database'
  })
  const got = await db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities: [Account]
  })
  return got
}

describe('AccountRepository', () => {
  beforeAll(async () => {
    client = await (await connect()).initialize()
  })

  afterAll(async () => {
    await client.destroy()
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
