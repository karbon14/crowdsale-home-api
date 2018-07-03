import { validate } from 'joi'

export const validateSchema = (data) => async (ctx, next) => {
  const { query, body, params, options } = data

  try {
    body && (await validate(ctx.request.body, body(ctx.request.body), options))
    query && (await validate(ctx.query, query(ctx.query), options))
    params && (await validate(ctx.params, params(ctx.params), options))

    return next()
  } catch (e) {
    ctx.throw(400, e.message)
  }
}
