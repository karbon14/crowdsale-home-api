import { contact, contactSchema } from './contact'
import joi from 'joi'

const sendEmail = jest.fn()

const name = 'contact test'
const email = 'contact.test@gmail.com'
const message = 'testing'

const ctx = {
  request: {
    body: {
      email,
      name,
      message,
    },
  },
  throw: jest.fn(),
}

describe('Contact controller ', () => {
  describe('When sendEmail receives the correct parameters', () => {
    test('Should be success', async () => {
      await contact(sendEmail)(ctx)

      expect(sendEmail.mock.calls[0]).toEqual([name, email, message])
    })
  })

  describe('When sendEmail success', () => {
    it('Should return 200', async () => {
      await contact(sendEmail)(ctx)

      expect(ctx.status).toEqual(200)
    })
  })

  describe('When sendEmail fail', () => {
    it('Should return 400 with a error message', async () => {
      sendEmail.mockReturnValueOnce(Promise.reject({ message: 'error' }))
      await contact(sendEmail)(ctx)

      expect(ctx.throw.mock.calls[0]).toEqual([400, 'error'])
    })
  })

  describe('When contactSchema success', () => {
    it('Should object with schema', async () => {
      const schema = contactSchema(joi)

      expect(schema).toHaveProperty('name')
      expect(schema).toHaveProperty('email')
      expect(schema).toHaveProperty('message')
    })
  })
})
