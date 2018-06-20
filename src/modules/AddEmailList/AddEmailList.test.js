import { AddEmailList } from './AddEmailList'
import Mailchimp from 'mailchimp-api-v3'

jest.mock('mailchimp-api-v3', function() {
  const mockPlaySoundFile = jest.fn()
  return jest.fn().mockImplementation(function() {
    return {
      post: mockPlaySoundFile,
    }
  })
})

const mailchimp = new Mailchimp('dummy-key')
const email = 'test@gmail.com'

describe('AddEmailList module', () => {
  describe('When development is true', () => {
    it('Should not called mailchimp.post', async () => {
      const configuration = {
        MAILCHIMP_API_KEY: '',
        MAILCHIMP_LIST_ID: '',
        development: true,
      }

      await AddEmailList(configuration)(email)

      expect(mailchimp.post).toHaveBeenCalledTimes(0)
    })
  })

  describe('When development is false', () => {
    it('Should call with MAILCHIMP_LIST_ID, and email parameters', async () => {
      const configuration = {
        development: false,
        MAILCHIMP_LIST_ID: 'list',
      }

      await AddEmailList(configuration)(email)

      const data = {
        email_address: email,
        status: 'subscribed',
      }

      const lastIndex = mailchimp.post.mock.calls.length - 1
      expect(mailchimp.post.mock.calls[lastIndex]).toEqual(['list', data])
    })
  })

  describe('When development is false and mailchimp post fail', () => {
    it('Should return a error message', async () => {
      const configuration = {
        development: false,
        MAILCHIMP_LIST_ID: 'list',
      }
      const message = 'error'

      mailchimp.post.mockReturnValueOnce(Promise.reject({ message }))

      try {
        await AddEmailList(configuration)(email)
      } catch (e) {
        expect(e).toEqual({ message })
      }
    })
  })
})
