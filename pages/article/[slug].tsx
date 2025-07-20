import { useState } from 'react'
import { GetStaticProps } from 'next'

import LayoutSlug from '../../components/LayoutSlug'

import { Article } from '../../typings'
import PortableText from 'react-portable-text'
import { sanityClient, urlFor } from '../../lib/sanityClient'
import { useForm, SubmitHandler } from 'react-hook-form'

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'

import Link from 'next/link'

interface FormData {
  _id: string
  name: string
  email: string
  comment: string
}

interface Props {
  article: Article
}

function Article({ article }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [openComments, setOpenComments] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        // console.log(data)
        setSubmitted(true)
      })
      .catch((err) => {
        // console.log(err)
        setSubmitted(false)
      })
  }

  let selectedLang = 'en'
  let lang = 'en-gb'
  selectedLang === 'en' ? lang : (lang = 'fi-FI')

  return (
    <LayoutSlug
      pageTitle={`${article.title} | Vaasa Islamic Society`}
      slug={article}
      slugType={'article'}
    >
      <article className="mx-auto max-w-5xl">
        <div className="mt-10 mb-3 flex items-center justify-between">
          <h1 className="text-3xl">{article.title}</h1>
          <Link href="/articles" className="btn-small inline-flex items-center text-xs md:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 -ml-1 h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            All Articles
          </Link>
        </div>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {article.description}
        </h2>
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(article.author.image).url()!}
            alt="Author"
          />
          <p className="text-sm font-extralight">
            Article by{' '}
            <span className="font-bold text-primary">
              {article.author.name}
            </span>{' '}
            - Published on{' '}
            <span className="font-medium italic">
              {new Date(article.publishedAt).toLocaleDateString(lang, {
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
            content={article.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="mt-5 mb-0 text-2xl font-bold" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="mt-4 mb-0 text-xl font-bold" {...props} />
              ),
              h3: (props: any) => (
                <h3 className="mt-3 mb-0 text-lg font-semibold" {...props} />
              ),
              normal: (props: any) => (
                <p className="mt-2 mb-4 inline-block text-justify" {...props} />
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

      <hr className="mx-auto my-5 hidden max-w-lg border border-ascent md:block" />

      {article.comments.length > 0 ? (
        <div
          className={`mx-auto my-10 flex max-w-3xl flex-col space-y-2 p-0 md:p-10 md:shadow md:shadow-primary ${
            openComments ? 'pb-6' : ''
          }`}
        >
          <div
            className="mb-2 flex cursor-pointer items-center justify-between border-b-2"
            onClick={() => setOpenComments(!openComments)}
          >
            <h3 className="-mb-[0.15rem] border-b-[3px] border-gray-900 text-xl font-medium md:text-2xl">
              Comments
            </h3>
            <button className="text-primary">
              {openComments ? (
                <ChevronUpIcon className="h-5 md:h-7" />
              ) : (
                <ChevronDownIcon className="h-5 md:h-7" />
              )}
            </button>
          </div>

          {openComments && (
            <div className="!mt-4">
              {article.comments.map((comment) => {
                const colorPallet = [
                  'bg-sky-500',
                  'bg-red-700',
                  'bg-pink-600',
                  'bg-fuchsia-600',
                  'bg-blue-700',
                  'bg-green-700',
                ]
                const randomColor =
                  colorPallet[Math.floor(Math.random() * colorPallet.length)]
                return (
                  <div key={comment._id} className="!mb-4">
                    <div className="flex items-center space-x-3">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-full text-center uppercase text-white ${randomColor}`}
                      >{`${comment.name[0]}${
                        comment.name.split(' ').length > 1
                          ? comment.name.split(' ')[1][0]
                          : ''
                      }`}</span>
                      <span className="self-start capitalize text-primary">
                        {comment.name}{' '}
                      </span>
                    </div>
                    <p className="-mt-4 ml-14 text-sm text-text-color">
                      {comment.comment}
                    </p>
                    <small className="mt-2 ml-14 block text-xs text-gray-400">
                      Posted:{' '}
                      <span className="italic">
                        {new Date(comment._createdAt).toLocaleTimeString(lang, {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </small>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      ) : (
        <></>
      )}

      {submitted ? (
        <div className="mx-auto flex max-w-2xl flex-col rounded-lg bg-primary p-10 py-8 text-white">
          <h3>Thank you for sumbmitting your comment.</h3>
          <p>Once it has been approved, it will appear above!</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mb-10 flex max-w-3xl flex-col"
        >
          <h3 className="text-sm text-primary">Do you like this article?</h3>
          <h4 className="text-2xl font-medium">Leave a comment above</h4>
          <hr className="mt-2 py-3" />
          <input
            {...register('_id')}
            type="hidden"
            name="_id"
            value={article._id}
          />
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="name"
              className="text-text-color-variant-10 py-1 text-sm"
            >
              Full name<sup>*</sup>:
            </label>
            <input
              {...register('name', { required: true })}
              id="name"
              className="form-input text-md w-full rounded-md border-2 border-gray-300 px-3 py-2 font-light text-text-color placeholder-text-color-variant-100 shadow outline-primary ring-secondary focus:border-white focus:ring "
              placeholder="Abdullahi Abbas"
              type="text"
            />
            {errors.name && (
              <span className="text-red-500">Full name is required</span>
            )}
          </div>
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="email"
              className="text-text-color-variant-10 py-1 text-sm"
            >
              Email Address<sup>*</sup>:
            </label>
            <input
              {...register('email', { required: true })}
              id="email"
              className="form-input text-md w-full rounded-md border-2 border-gray-300 px-3 py-2 font-light text-text-color placeholder-text-color-variant-100 shadow outline-primary ring-secondary focus:border-white focus:ring"
              placeholder="abdullahi.abbas@gmail.com"
              type="email"
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="comment"
              className="text-text-color-variant-10 py-1 text-sm"
            >
              Comment<sup>*</sup>:{' '}
            </label>
            <textarea
              {...register('comment', { required: true })}
              id="comment"
              className="form-input text-md w-full rounded-md border-2 border-gray-300 px-3 py-2 font-light text-text-color placeholder-text-color-variant-100 shadow outline-primary ring-secondary focus:border-white focus:ring"
              placeholder="Your comment"
              rows={8}
            />
            {errors.comment && (
              <span className="text-red-500">Comment is required</span>
            )}
          </div>
          <button type="submit" className="focus:shadow-outline btn mt-10">
            Submit
          </button>
        </form>
      )}
    </LayoutSlug>
  )
}

export default Article

export const getStaticPaths = async () => {
  const query = `*[_type == "article"]{
    _id,
    slug {
      current
    }
  }`

  const articles = await sanityClient.fetch(query)
  const paths = articles.map((article: Article) => ({
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
  const query = `*[_type == "article" && slug.current == $slug][0]{
    _id,
    publishedAt,
    title,
    author -> {
      name,
      image
    },
     'comments': *[
      _type == "comment" &&
      article._ref == ^._id && 
      approved == true 
      ] | order(_createdAt desc),
    description,
    mainImage,
    slug, 
    body
}`

  const article = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!article) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      article,
    },
    revalidate: 30, // new content every 5 minutes
  }
}
