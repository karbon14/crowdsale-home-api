import { ensureEnvVars } from './configuration'
import { log } from '../log'

jest.mock('process', () => ({
  env: {
    SENDGRID_API_KEY: '',
    EMAIL_CONTACT_TO: '',
    MAILCHIMP_API_KEY: '',
    MAILCHIMP_LIST_ID: '',
    NODE_ENV: 'development',
  },
}))

process.env.SENDGRID_API_KEY = ''

describe('Configuration ', () => {
  describe('When ensureEnvVars receives the correct parameters', () => {
    test('Should return envVar', () => {
      const envVar = true
      const result = ensureEnvVars(envVar)

      expect(result).toEqual(envVar)
    })
  })

  describe('When ensureEnvVars fail', () => {
    test('Should return console warn', () => {
      const envVar = false
      const messageError = 'error'
      log.warn = jest.fn()
      ensureEnvVars(envVar, messageError)
      expect(log.warn.mock.calls[0]).toEqual([messageError])
    })
  })

  describe('When configuration success', () => {
    test('Should be success', () => {
      const { configuration } = require('./configuration')

      expect(configuration).toHaveProperty('SENDGRID_API_KEY')
      expect(configuration).toHaveProperty('EMAIL_CONTACT_TO')
      expect(configuration).toHaveProperty('MAILCHIMP_API_KEY')
      expect(configuration).toHaveProperty('MAILCHIMP_LIST_ID')
      expect(configuration).toHaveProperty('WHITEPAPER_FILE')
      expect(configuration).toHaveProperty('development')
    })
  })
})
