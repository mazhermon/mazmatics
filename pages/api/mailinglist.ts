// https://developers.mailerlite.com/reference/create-a-subscriber
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  email?: string
  groups?: Array<string>
  status?: string
  error?: string | null
}

interface IEmailSignup {
  (arg0: NextApiRequest, arg1: NextApiResponse<Data>): void
}

function getRequestParams(email: string) {
  return {
    method: 'POST',
    url: process.env.MAILER_LITE_SIGNUP_URL || '',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.MAILER_LITE_API_KEY}`,
      accept: 'application/json',
      'X-MailerLite-ApiDocs': 'true',
      'content-type': 'application/json',
      'X-MailerLite-ApiKey': process.env.MAILER_LITE_API_KEY ?? '',
    },

    data: {
      email,
      groups: [process.env.MAILER_LITE_MAIN_GROUP_ID],
      status: 'active',
    },
  }
}

const EmailSignup: IEmailSignup = async (req, res) => {
  const { email } = req.body

  if (!email || !email.length) {
    return res.status(400).json({
      error: 'Forgot to add your email?',
    })
  }

  //TODO write some tests for this
  const emailRegex = /^\w+([\.\-\+]?\w+)*@\w+([\.\-\+]?\w+)*(\.\w{2,3})+$/g
  const validEmail = email && emailRegex.test(email)
  if (!validEmail) {
    return res.status(400).json({
      error: 'Please enter valid email address',
    })
  }

  try {
    const { url, headers, data } = getRequestParams(email)
    await axios.post(url, data, { headers })
    return res.status(201).json({ error: null })
  } catch (error) {
    return res.status(400).json({
      error:
        'Sorry, something went wrong. You can try again or just email hellomazmatics@gmail.com for help',
    })
  }
}

export default EmailSignup
