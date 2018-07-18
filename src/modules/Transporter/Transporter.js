import { createTransport } from 'nodemailer'
import sgTransport from 'nodemailer-sendgrid-transport'

const optionsSendgrid = (SENDGRID_API_KEY) => ({
  auth: {
    api_key: SENDGRID_API_KEY,
  },
})

const getTransport = (configuration) => {
  const { development, SENDGRID_API_KEY, MAILDEV_HOST, MAILDEV_PORT } = configuration
  const optionMaildev = {
    host: MAILDEV_HOST,
    port: MAILDEV_PORT,
    ignoreTLS: true,
  }

  return development ? optionMaildev : sgTransport(optionsSendgrid(SENDGRID_API_KEY))
}
export const Transporter = (configuration) => createTransport(getTransport(configuration))
