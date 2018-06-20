import request from 'supertest'
import { configuration } from './configuration'

const api = request(configuration.API_URL)

describe('Whitepaper ', () => {
  describe('when is called', () => {
    it('Should return 200', (done) => {
      api
        .get('/whitepaper')
        .expect('content-disposition', 'attachment; filename=whitepaper_Karbon14.pdf')
        .expect(200, done)
    })
  })
})
