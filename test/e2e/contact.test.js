import request from 'supertest'
import { configuration } from './configuration'

const api = request(configuration.API_URL)

describe('Contact ', () => {
  describe('When receives parameters name, email and message', () => {
    test('Should return 200', (done) => {
      api
        .post('/contact')
        .send({ name: 'Testing', email: 'test@gmail.com', message: 'Test' })
        .expect(200, done)
    })
  })
  describe('When doesnt receive parameters', () => {
    test('Should return 400', (done) => {
      api.post('/contact').expect(400, done)
    })
  })
})
