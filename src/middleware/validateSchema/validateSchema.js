import { validate } from 'joi'

export const validateSchema = (schema, options) => async (ctx, next) => {
  const { body } = ctx.request

  try {
    await validate(body, schema, options)
    return next()
  } catch (e) {
    ctx.throw(400, e.message)
  }
}
