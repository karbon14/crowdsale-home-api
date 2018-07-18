import { log } from '../log'

const {
  SENDGRID_API_KEY,
  EMAIL_CONTACT_TO,
  MAILCHIMP_API_KEY,
  MAILCHIMP_LIST_ID,
  WHITEPAPER_FILE_EN,
  WHITEPAPER_FILE_ES,
  MAILDEV_HOST,
  MAILDEV_PORT,
  NODE_ENV,
} = process.env

export const ensureEnvVars = (envVar = '', error) => {
  if (envVar) return envVar

  log.warn(error)
}

export const configuration = {
  SENDGRID_API_KEY: ensureEnvVars(SENDGRID_API_KEY, 'Sendgrid Api Key is required'),
  EMAIL_CONTACT_TO: ensureEnvVars(EMAIL_CONTACT_TO, 'Email Contact To is required'),
  MAILCHIMP_API_KEY: ensureEnvVars(MAILCHIMP_API_KEY, 'Mailchimp Api Key To is required'),
  MAILCHIMP_LIST_ID: ensureEnvVars(MAILCHIMP_LIST_ID, 'Mailchimp List Id To is required'),
  WHITEPAPER_FILE_EN: WHITEPAPER_FILE_EN || 'whitepaper_Karbon14.pdf',
  WHITEPAPER_FILE_ES: WHITEPAPER_FILE_ES || 'whitepaper_Karbon14.pdf',
  MAILDEV_HOST: MAILDEV_HOST || 'localhost',
  MAILDEV_PORT: MAILDEV_PORT || 1025,
  development: NODE_ENV === 'development' ? true : false,
}
