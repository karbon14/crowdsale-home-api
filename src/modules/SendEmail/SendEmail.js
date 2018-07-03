export const createMessage = (from, to = 'test@gmail.com', name, text) => ({
  from,
  to,
  subject: `Support to ${name}`,
  text,
})

export const SendEmail = (configuration, transporter) => async (name, from, text) => {
  const { EMAIL_CONTACT_TO } = configuration
  const message = createMessage(from, EMAIL_CONTACT_TO, name, text)

  try {
    await transporter.sendMail(message)
  } catch (e) {
    throw e
  }
}
