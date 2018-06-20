import { createTransport } from 'nodemailer'
import sgTransport from 'nodemailer-sendgrid-transport'

const optionMaildev = {
  port: 1025,
  ignoreTLS: true,
}

const optionsSendgrid = (SENDGRID_API_KEY) => ({
  auth: {
    api_key: SENDGRID_API_KEY,
  },
})

const getTransport = (configuration) => {
  const { development, SENDGRID_API_KEY } = configuration
  return development ? optionMaildev : sgTransport(optionsSendgrid(SENDGRID_API_KEY))
}
export const Transporter = (configuration) => createTransport(getTransport(configuration))
