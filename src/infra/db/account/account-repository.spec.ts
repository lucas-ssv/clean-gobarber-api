import { AccountRepository } from './account-repository'
import { client } from '../client'

describe('AccountRepository', () => {
  beforeEach(async () => {
    await client.account.deleteMany()
  })

  describe('add()', () => {
    test('Should add an account on add success', async () => {
      const mockAccount = {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'hashed_password',
        isBarber: false
      }
      const sut = new AccountRepository()
      const account = await sut.add(mockAccount)
      expect(account).toBeTruthy()
      expect(mockAccount.name).toBe(account?.name)
      expect(mockAccount.email).toBe(account?.email)
      expect(mockAccount.password).toBe(account?.password)
      expect(mockAccount.isBarber).toBe(account?.isBarber)
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on loadByEmail success', async () => {
      const mockEmail = 'any_email@mail.com'
      const sut = new AccountRepository()
      await client.account.create({
        data: {
          name: 'any_name',
          email: mockEmail,
          password: 'any_password'
        }
      })
      const accountByEmail = await sut.loadByEmail(mockEmail)
      expect(accountByEmail).toBeTruthy()
      expect(accountByEmail.email).toBe(mockEmail)
    })

    test('Should return null if any account found', async () => {
      const sut = new AccountRepository()
      const accountByEmail = await sut.loadByEmail('any_email@mail.com')
      expect(accountByEmail).toBeNull()
    })
  })
})