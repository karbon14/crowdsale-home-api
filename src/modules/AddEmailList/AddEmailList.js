import Mailchimp from 'mailchimp-api-v3'

export const AddEmailList = (configuration) => async (email) => {
  const { MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID, development } = configuration
  const mailchimp = new Mailchimp(MAILCHIMP_API_KEY || 'dummy-key')

  return development
    ? Promise.resolve()
    : await mailchimp.post(MAILCHIMP_LIST_ID, {
        email_address: email,
        status: 'subscribed',
      })
}
