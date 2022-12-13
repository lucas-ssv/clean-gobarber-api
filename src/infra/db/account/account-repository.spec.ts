import { AccountRepository } from './account-repository'
import { client } from '../client'

describe('AccountRepository', () => {
  beforeEach(async () => {
    await client.account.deleteMany()
  })

  test('Should add an account on add success', async () => {
    const mockAccount = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password',
      isBarber: false
    }
    const sut = new AccountRepository()
    await sut.add(mockAccount)
    const account = await client.account.findUnique({ where: {
      email: mockAccount.email
    } })
    expect(account).toBeTruthy()
    expect(mockAccount.name).toBe(account?.name)
    expect(mockAccount.email).toBe(account?.email)
    expect(mockAccount.password).toBe(account?.password)
    expect(mockAccount.isBarber).toBe(account?.is_barber)
  })
})