/* eslint-disable-next-line */
import sgTransport from 'nodemailer-sendgrid-transport'
import { createTransport } from 'nodemailer'
import { Transporter } from './Transporter'

jest.mock('nodemailer-sendgrid-transport', () => () => ({
  auth: {
    api_key: '123',
  },
}))

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(),
}))

describe('Transporter module', () => {
  describe('When development is false', () => {
    it('Should createTransport called with optionsSendgrid', async () => {
      const configuration = {
        development: false,
        SENDGRID_API_KEY: '123',
      }

      const optionsSendgrid = {
        auth: {
          api_key: '123',
        },
      }

      Transporter(configuration)

      expect(createTransport.mock.calls[0]).toEqual([optionsSendgrid])
    })
  })

  describe('When development is true', () => {
    it('Should createTransport called with maildev', async () => {
      const configuration = {
        development: true,
        MAILDEV_HOST: 'localhost',
        MAILDEV_PORT: 1025,
      }

      const optionMaildev = {
        host: 'localhost',
        port: 1025,
        ignoreTLS: true,
      }

      Transporter(configuration)

      expect(createTransport.mock.calls[1]).toEqual([optionMaildev])
    })
  })
})
