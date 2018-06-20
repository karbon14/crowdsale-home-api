import { validateSchema } from './validateSchema'
import { validate } from 'joi'

jest.mock('joi', () => ({
  validate: jest.fn(),
}))

const next = jest.fn()
const ctx = {
  request: {
    body: {},
  },
  throw: jest.fn(),
}

describe('Validate middleware ', () => {
  const schema = 'schema'
  const options = 'options'
  const { body } = ctx.request

  describe('When Joi validate success', () => {
    it('Should be success', async () => {
      const result = validateSchema(schema, options)
      await result(ctx, next)

      expect(validate.mock.calls[0]).toEqual([body, schema, options])
    })
  })

  describe('When Next success', () => {
    it('Should be success', async () => {
      const result = validateSchema(schema, options)
      await result(ctx, next)

      expect(next).toHaveBeenCalled()
    })
  })

  describe('When validate fail', () => {
    it('Should return 400 with a error message', async () => {
      validate.mockReturnValueOnce(Promise.reject({ message: 'error' }))
      const result = validateSchema(schema, options)
      await result(ctx, next)

      expect(ctx.throw.mock.calls[0]).toEqual([400, 'error'])
    })
  })
})
