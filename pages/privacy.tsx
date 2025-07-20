import Image from 'next/image'
import { useState } from 'react'
import { GetStaticProps } from 'next'

import Layout from '../components/Layout'

import type { Privacy } from '../typings'
import PortableText from 'react-portable-text'
import { sanityClient } from '../lib/sanityClient'

interface Props {
  privacy: Privacy
}

const Privacy = ({ privacy }: Props) => {
  return (
    <Layout
      pageTitle="Privacy Policy | Vaasa Islamic Society"
      title="Privacy Policy"
    >
      <section className="mt-0 flex flex-col gap-2 md:my-20 md:flex-row">
        <div className="mt-0">
          <PortableText
            className="overflow-x-hidden"
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={privacy.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="mt-5 mb-0 text-2xl font-bold" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="mt-4 mb-0 text-lg font-medium" {...props} />
              ),
              normal: (props: any) => (
                <p className="my-3 inline-block text-justify" {...props} />
              ),
              ol: ({ children }: any) => (
                <ol className="ml-5 list-decimal">{children}</ol>
              ),
              ul: ({ children }: any) => (
                <ul className="ml-8 list-disc">{children}</ul>
              ),
              link: ({ href, children }: any) => (
                <a
                  href={href}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </section>
    </Layout>
  )
}

export default Privacy

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "privacy"][0]{
    _id,
    publishedAt,
    title,
    mainImage,
    body
}`

  const privacy = await sanityClient.fetch(query)

  if (!privacy) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      privacy,
    },
    revalidate: 30000, // new content every 500 minutes
  }
}
