import request from 'supertest'
import { configuration } from './configuration'

const api = request(configuration.API_URL)

describe('Subscribe ', () => {
  describe('When receives parameters email', () => {
    it('Should return 200', (done) => {
      api
        .post('/subscribe')
        .send({ email: 'test@gmail.com' })
        .expect(200, done)
    })
  })
  describe('When doesnt receive parameters', () => {
    it('Should return 400', (done) => {
      api.post('/subscribe').expect(400, done)
    })
  })
})
