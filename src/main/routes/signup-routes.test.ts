import request from 'supertest'
import { app } from '../config/app'

describe('SignUpRoutes', () => {
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
