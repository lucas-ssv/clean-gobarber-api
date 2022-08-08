import { app } from '../../config/app'
import request from 'supertest'

describe('ContentType', () => {
  test('Should content type as application json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('')
    })
    await request(app)
      .get('/test_content_type')
      .expect('Content-Type', /json/)
  })
})
