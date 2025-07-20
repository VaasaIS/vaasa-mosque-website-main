import { GetStaticProps } from 'next'
import Link from 'next/link'

import LayoutSlug from '../../components/LayoutSlug'

import { InfoNews } from '../../typings'
import PortableText from 'react-portable-text'
import { sanityClient } from '../../lib/sanityClient'

interface Props {
  info: InfoNews
}

function InfoNews({ info }: Props) {
  let selectedLang = 'en'
  let lang = 'en-gb'
  selectedLang === 'en' ? lang : (lang = 'fi-FI')

  return (
    <LayoutSlug
      pageTitle={`${info.title} | Vaasa Islamic Society`}
      slug={info}
      slugType={'info-news'}
    >
      <article className="mx-auto max-w-5xl">
        <div className="mt-10 mb-3 flex items-center justify-between">
          <h1 className="text-3xl">{info.title}</h1>
          <Link href="/info-news" className="btn-small inline-flex items-center text-xs md:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 -ml-1 h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            All Info/News
          </Link>
        </div>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {info.description}
        </h2>
        <div className="flex items-center space-x-2">
          <p className="text-sm font-extralight">
            Published on{' '}
            <span className="font-medium italic">
              {new Date(info.publishedAt).toLocaleDateString(lang, {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </p>
        </div>
        <div className="mt-10">
          <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={info.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="mt-5 mb-0 text-2xl font-bold" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="mt-4 mb-0 text-xl font-bold" {...props} />
              ),
              normal: (props: any) => (
                <p className="my-3 inline-block text-justify" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-8 list-disc">{children}</li>
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
      </article>
    </LayoutSlug>
  )
}

export default InfoNews

export const getStaticPaths = async () => {
  const query = `*[_type == "article"]{
    _id,
    slug {
      current
    }
  }`

  const info = await sanityClient.fetch(query)
  const paths = info.map((article: InfoNews) => ({
    params: {
      slug: article.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "info-news" && slug.current == $slug][0]{
    _id,
    publishedAt,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug, 
    body
}`

  const info = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!info) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      info,
    },
    revalidate: 300, // new content every 5 minutes
  }
}
