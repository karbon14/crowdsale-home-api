import { validateSchema } from './validateSchema'
import { validate } from 'joi'

jest.mock('joi', () => ({
  validate: jest.fn(),
}))

const next = jest.fn()
const ctx = {
  request: {
    body: { test: 'body' },
    options: { test: 'options' },
  },
  query: { test: 'query' },
  params: { test: 'params' },
  throw: jest.fn(),
}

describe('Validate middleware ', () => {
  const { body } = ctx.request
  const { query, params } = ctx

  describe('When validate receive body and success', () => {
    it('Should be success', async () => {
      const result = validateSchema({
        body: () => {
          return body
        },
      })

      await result(ctx, next)

      expect(validate.mock.calls[0]).toEqual([body, body, undefined])
    })
  })

  describe('When validate receive body and fail', () => {
    it('Should return 400 with a error message', async () => {
      validate.mockReturnValueOnce(Promise.reject({ message: 'error' }))
      const result = validateSchema({
        body: () => {
          return body
        },
      })

      await result(ctx, next)

      expect(ctx.throw.mock.calls[0]).toEqual([400, 'error'])
    })
  })

  describe('When validate receive query and success', () => {
    it('Should be success', async () => {
      const result = validateSchema({
        query: () => {
          return query
        },
      })

      await result(ctx, next)

      expect(validate.mock.calls[validate.mock.calls.length - 1]).toEqual([query, query, undefined])
    })
  })

  describe('When validate receive query and fail', () => {
    it('Should return 400 with a error message', async () => {
      validate.mockReturnValueOnce(Promise.reject({ message: 'error' }))
      const result = validateSchema({
        query: () => {
          return query
        },
      })

      await result(ctx, next)

      expect(ctx.throw.mock.calls[ctx.throw.mock.calls.length - 1]).toEqual([400, 'error'])
    })
  })

  describe('When validate receive params and success', () => {
    it('Should be success', async () => {
      const result = validateSchema({
        params: () => {
          return params
        },
      })

      await result(ctx, next)

      expect(validate.mock.calls[validate.mock.calls.length - 1]).toEqual([params, params, undefined])
    })
  })

  describe('When validate receive params and fail', () => {
    it('Should return 400 with a error message', async () => {
      validate.mockReturnValueOnce(Promise.reject({ message: 'error' }))
      const result = validateSchema({
        params: () => {
          return params
        },
      })
      await result(ctx, next)

      expect(ctx.throw.mock.calls[ctx.throw.mock.calls.length - 1]).toEqual([400, 'error'])
    })
  })

  describe('When validate does not receive body, query or options', () => {
    it('Should call next', async () => {
      const result = validateSchema({})
      await result(ctx, next)

      expect(next).toHaveBeenCalled()
    })
  })
})
