import { app } from '../../config/app'
import request from 'supertest'

describe('BodyParser', () => {
  test('Should body parser as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'any_name' })
      .expect({ name: 'any_name' })
  })
})
