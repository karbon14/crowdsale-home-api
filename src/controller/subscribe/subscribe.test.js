import { subscribe, subscribeSchema } from './subscribe'
import joi from 'joi'

const addEmailList = jest.fn()

const email = 'contact.test@gmail.com'
const ctx = {
  request: {
    body: {
      email,
    },
  },
  throw: jest.fn(),
}

describe('Subscribe controller ', () => {
  describe('When addEmailList receives the correct parameters', () => {
    it('Should be success', async () => {
      await subscribe(addEmailList)(ctx)
      expect(addEmailList.mock.calls[0]).toEqual([email])
    })
  })

  describe('When subscribe success', () => {
    it('Should return 200', async () => {
      await subscribe(addEmailList)(ctx)
      expect(ctx.status).toEqual(200)
    })
  })

  describe('When subscribe fail', () => {
    it('Should return 400 with a error message', async () => {
      addEmailList.mockReturnValueOnce(Promise.reject({ message: 'error' }))
      await subscribe(addEmailList)(ctx)
      expect(ctx.throw.mock.calls[0]).toEqual([400, 'error'])
    })
  })

  describe('When subscribeSchema success', () => {
    it('Should object with schema', async () => {
      const schema = subscribeSchema(joi)

      expect(schema).toHaveProperty('email')
    })
  })
})
