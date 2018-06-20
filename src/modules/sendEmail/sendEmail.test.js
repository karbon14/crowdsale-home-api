import { SendEmail } from './SendEmail'

const name = 'test'
const from = 'contact.test@gmail.com'
const text = 'text'

const transporter = {
  sendMail: jest.fn(),
}

const configuration = {
  EMAIL_CONTACT_TO: 'test',
}

describe('SendEmail module', () => {
  describe('When addEmailList receives the correct parameters', () => {
    it('Should be success', async () => {
      await SendEmail(configuration, transporter)(name, from, text)

      const message = {
        from,
        to: configuration.EMAIL_CONTACT_TO,
        subject: `Support to ${name}`,
        text,
      }

      expect(transporter.sendMail.mock.calls[0]).toEqual([message])
    })
  })

  describe('When sendMail return reject', () => {
    it('Should return error message', async () => {
      const message = 'error'
      transporter.sendMail.mockReturnValueOnce(Promise.reject({ message }))

      try {
        await SendEmail(configuration, transporter)(name, from, text)
      } catch (error) {
        expect(error).toEqual({ message })
      }
    })
  })
})
