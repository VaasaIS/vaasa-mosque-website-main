import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}

const client = sanityClient(config)

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    id,
    date,
    firstName,
    lastName,
    email,
    phoneNumber,
    message,
    image,
    category,
  } = JSON.parse(req.body)

  try {
    await client.create({
      _type: 'inquiry',
      id,
      date,
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
      image,
      category,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Inquiry  NOT submitted!', err })
  }

  // console.log('Inquiry submitted!')
  res.status(200).json({ message: 'Inquiry submitted successfully' })
}
