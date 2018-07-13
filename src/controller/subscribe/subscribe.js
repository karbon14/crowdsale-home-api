import Joi from 'joi'

export const subscribeSchema = () => ({
  email: Joi.string()
    .email()
    .required(),
})

export const subscribe = (addEmailList) => async (ctx) => {
  const { email } = ctx.request.body

  try {
    await addEmailList(email)
    
    ctx.status = 200
  } catch (e) {
    ctx.throw(400, e.message)
  }
}
