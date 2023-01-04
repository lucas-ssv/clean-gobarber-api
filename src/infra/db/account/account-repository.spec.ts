import { AccountRepository } from './account-repository'
import { client } from '../client'

describe('AccountRepository', () => {
  beforeEach(async () => {
    await client.scheduledTimes.deleteMany()
    await client.account.deleteMany()
  })

  afterEach(async () => {
    await client.scheduledTimes.deleteMany()
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

  describe('load()', () => {
    test('Should load account on load success', async () => {
      const sut = new AccountRepository()
      await client.account.create({
        data: {
          id: 'unique_id',
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password'
        }
      })
      const account = await sut.load('unique_id')
      expect(account).toBeTruthy()
      expect(account.id).toBe('unique_id')
    })
  })

  describe('loadAll()', () => {
    test('Should load all accounts barbers on success', async () => {
      const sut = new AccountRepository()
      await client.account.create({
        data: {
          id: 'any_id',
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          is_barber: true
        }
      })
      const accounts = await sut.loadAll({ isBarber: true })
      expect(accounts.length).toBe(1)
      expect(accounts[0].id).toBe('any_id')
      expect(accounts[0].name).toBe('any_name')
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on loadByEmail success', async () => {
      const mockEmail = 'any_email@mail.com'
      const sut = new AccountRepository()
      const avatar = await client.avatar.create({
        data: {
          name: 'any_name',
          url: 'any_url'
        }
      })
      await client.account.create({
        data: {
          name: 'any_name',
          email: mockEmail,
          password: 'any_password',
          avatar_id: avatar.id
        }
      })
      const accountByEmail = await sut.loadByEmail(mockEmail)
      expect(accountByEmail).toBeTruthy()
      expect(accountByEmail.email).toBe(mockEmail)
      expect(accountByEmail.avatar?.name).toBe('any_name')
      expect(accountByEmail.avatar?.url).toBe('any_url')
    })

    test('Should return null if any account found', async () => {
      const sut = new AccountRepository()
      const accountByEmail = await sut.loadByEmail('any_email@mail.com')
      expect(accountByEmail).toBeNull()
    })
  })

  describe('update()', () => {
    test('Should update an account on success', async () => {
      const sut = new AccountRepository()
      const result = await client.account.create({
        data: {
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password'
        }
      })
      const account = await sut.update({
        id: result.id,
        name: 'updated_name',
        newPassword: 'updated_new_password'
      })
      expect(account.name).toBe('updated_name')
      expect(account.password).toBe('updated_new_password')
    })
  })
})