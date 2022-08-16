import { app } from '../config/app'
import { DbHelper } from '../../infra/db/helpers/db-helper'
import { Account } from '../../infra/db/database/entities/account'
import request from 'supertest'

describe('SignUpRoutes', () => {
  beforeAll(async () => {
    await (await DbHelper.getRepository(Account)).clear()
  })

  afterAll(async () => {
    await DbHelper.disconnect()
  })

  test('POST /signup', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        isBarber: false
      })
      .expect(201)
  })
})
