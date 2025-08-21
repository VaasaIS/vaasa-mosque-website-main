import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'
import { v4 as uuidv4 } from 'uuid'

const config = {
  apiVersion: '2024-01-01',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}

const client = sanityClient(config)

export default async function createMember(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    id,
    date,
    fullName,
    email,
    phone,
    gender,
    nationality,
    ageGroup,
    hasSpouse,
    spouseFullName,
    spouse,
    hasChildren,
    childrenDetails,
    children,
    gdprConsent,
    muslimInVaasa,
    employmentStatus,
    occupation,
    organization,
  } = JSON.parse(req.body)

  try {
    const childrenWithKeys = Array.isArray(children)
      ? children.map((child: any) => ({
          _key: uuidv4(),
          name: child?.name ?? '',
          age: child?.age ?? '',
          occupation: child?.occupation ?? '',
        }))
      : []

    await client.create({
      _type: 'membersList',
      id,
      date,
      fullName,
      email,
      phone,
      gender,
      nationality,
      ageGroup,
      hasSpouse,
      spouseFullName,
      spouse,
      hasChildren,
      childrenDetails,
      children: childrenWithKeys,
      gdprConsent,
      muslimInVaasa,
      employmentStatus,
      occupation,
      organization,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Member registration NOT submitted!', err })
    return
  }

  res.status(200).json({ message: 'Member registration submitted successfully' })
}

