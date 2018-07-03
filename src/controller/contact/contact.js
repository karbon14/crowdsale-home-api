import Joi from 'joi'

export const contactSchema = () => ({
  name: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  message: Joi.string().required(),
})

export const contact = (sendEmail) => async (ctx) => {
  const { name, email, message } = ctx.request.body

  try {
    await sendEmail(name, email, message)

    ctx.status = 200
  } catch (e) {
    ctx.throw(400, e.message)
  }
}
