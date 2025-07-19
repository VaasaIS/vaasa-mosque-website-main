import { useState, useLayoutEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Layout from '../components/Layout'

import { sanityClient, urlFor } from '../lib/sanityClient'
import { Article } from '../typings'

import { CalendarIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import {
  DocumentTextIcon,
  VolumeUpIcon,
  VideoCameraIcon,
} from '@heroicons/react/solid'

interface Props {
  articles: [Article]
}

const Articles = ({ articles }: Props) => {
  const [openArticles, setOpenArticles] = useState(true)
  const [openAudiosVideos, setOpenAudiosVideos] = useState(false)
  const router = useRouter()

  useLayoutEffect(() => {
    if (router.query.keyword === 'openAudiosVideos') {
      setOpenArticles(!openArticles)
      setOpenAudiosVideos(!openAudiosVideos)
    }
  }, [])

  let selectedLang = 'en'
  let lang = 'en-gb'
  selectedLang === 'en' ? lang : (lang = 'fi-FI')
  return (
    <Layout
      pageTitle="Vaasa Islamic Society | All Articles"
      title="All Articles, Audios &amp; Videos "
    >
      <section id="all-articles" className="my-16">
        <div
          className="mb-4 flex cursor-pointer items-center justify-between border-b-2"
          onClick={() => setOpenArticles(!openArticles)}
        >
          <h2 className="-mb-[0.15rem] border-b-[3px] border-gray-900 text-xl font-bold md:text-2xl">
            All Articles
          </h2>
          <button className="text-primary">
            {openArticles ? (
              <ChevronUpIcon className="h-5 md:h-7" />
            ) : (
              <ChevronDownIcon className="h-5 md:h-7" />
            )}
          </button>
        </div>

        {openArticles &&
          articles.map((article) => (
            <article
              key={article._id}
              className="relative mb-12 flex rounded-lg text-left"
            >
              <div className="absolute top-[0.25rem] right-0 z-10 inline-flex items-center justify-start space-x-2 rounded-full bg-white px-[0.5rem] py-[0.2rem] text-[0.7rem] text-text-color md:top-4 md:left-5 md:right-auto md:text-xs">
                <CalendarIcon className="h-[0.8rem] md:h-5" />
                <span>
                  {new Date(article.publishedAt).toLocaleDateString(lang, {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="hidden md:flex md:w-3/12">
                <Image
                  src={urlFor(article.mainImage).url()!}
                  objectFit="cover"
                  className="w-full rounded-lg object-fill"
                  height={250}
                  width={500}
                />
              </div>
              <div className="w-full px-0 md:w-9/12 md:px-5">
                <header>
                  <h1 className="mb-1 text-lg font-bold text-primary md:mb-2 md:text-xl">
                    {article.title}
                  </h1>
                </header>
                <p className="text-sm font-light md:text-base md:font-normal">
                  {article.description}
                </p>
                <div className="mt-4 flex justify-start md:mt-10">
                  <Link href={`/article/${article.slug.current}`}>
                    <a className="btn-small inline-flex items-center">
                      Read More
                      <svg
                        className="ml-2 -mr-1 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </Link>
                </div>
              </div>
            </article>
          ))}
      </section>
      <section id="all-audios-texts-videos" className="mt-20">
        <div
          className="mb-4 flex cursor-pointer items-center justify-between border-b-2"
          onClick={() => setOpenAudiosVideos(!openAudiosVideos)}
        >
          <h2 className="-mb-[0.15rem] border-b-[3px] border-gray-900 text-xl font-bold md:text-2xl">
            All Audios, Texts and Videos
          </h2>
          <button className="text-primary">
            {openAudiosVideos ? (
              <ChevronUpIcon className="h-5 md:h-7" />
            ) : (
              <ChevronDownIcon className="h-5 md:h-7" />
            )}
          </button>
        </div>

        {openAudiosVideos && (
          <ul className="mb-3">
            <li className="text-md flex cursor-pointer items-center justify-between py-1 text-text-color md:py-2 md:text-xl">
              Essense of life (English)
              <span className="font-sm ml-2 flex items-center text-xs md:text-base">
                <VideoCameraIcon className="mr-2 h-5" />
                10:24
              </span>
            </li>
            <li className="text-md flex cursor-pointer items-center justify-between py-1 text-text-color md:py-2 md:text-xl">
              Essense of life (English)
              <span className="font-sm ml-2 flex items-center text-xs md:text-base">
                <DocumentTextIcon className="mr-2 h-5" />
                10:24
              </span>
            </li>
            <li className="text-md flex cursor-pointer items-center justify-between py-1 text-text-color md:py-2 md:text-xl">
              Essense of life (English)
              <span className="font-sm ml-2 flex items-center text-xs md:text-base">
                <DocumentTextIcon className="mr-2 h-5" />
                10:24
              </span>
            </li>
            <li className="text-md flex cursor-pointer items-center justify-between py-2 text-text-color md:text-xl">
              Essense of life (English)
              <span className="font-sm ml-2 flex items-center text-xs md:text-base">
                <VolumeUpIcon className="mr-2 h-5" />
                10:24
              </span>
            </li>
            <li className="text-md flex cursor-pointer items-center justify-between py-1 text-text-color md:py-2 md:text-xl">
              Essense of life (English)
              <span className="font-sm ml-2 flex items-center text-xs md:text-base">
                <VideoCameraIcon className="mr-2 h-5" />
                10:24
              </span>
            </li>
            <li className="text-md flex cursor-pointer items-center justify-between py-1 text-text-color md:py-2 md:text-xl">
              Essense of life (English)
              <span className="font-sm ml-2 flex items-center text-xs md:text-base">
                <DocumentTextIcon className="mr-2 h-5" />
                10:24
              </span>
            </li>
          </ul>
        )}
      </section>
    </Layout>
  )
}

export default Articles

export const getServerSideProps = async () => {
  const query = `
  *[_type=="article"] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  description,
  mainImage,
}`

  const articles = await sanityClient.fetch(query)

  return {
    props: {
      articles,
    },
  }
}
