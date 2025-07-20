import { useState, useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Layout from '../components/Layout'

import { CalendarIcon } from '@heroicons/react/outline'

import { sanityClient, urlFor } from '../lib/sanityClient'
import type { Event, InfoNews } from '../typings'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  LocationMarkerIcon,
} from '@heroicons/react/outline'
import DefaultImage from '../assets/default-image.png'

interface Props {
  infoNews: [InfoNews]
  events: [Event]
}

const InfoEvents = ({ events, infoNews }: Props) => {
  const [openLatestNews, setOpenLatestNews] = useState(true)
  const [openLatestEvents, setOpenLatestEvents] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (router.query.keyword === 'openLatestEvents') {
      setOpenLatestNews(false)
      setOpenLatestEvents(true)
    }
  }, [])

  let selectedLang = 'en'
  let lang = 'en-gb'

  selectedLang === 'en' ? lang : (lang = 'fi-FI')
  return (
    <Layout
      pageTitle="Info &amp; Events | Vaasa Islamic Society "
      title="Info &amp; Events"
    >
      <section id="latest-news" className="mt-16">
        <div
          className="mb-4 flex cursor-pointer items-center justify-between border-b-2"
          onClick={() => setOpenLatestNews(!openLatestNews)}
        >
          <h2 className="-mb-[0.15rem] border-b-[3px] border-gray-900 text-xl font-bold md:text-2xl">
            Latest News
          </h2>
          <button className="text-primary">
            {openLatestNews ? (
              <ChevronUpIcon className="h-5 md:h-7" />
            ) : (
              <ChevronDownIcon className="h-5 md:h-7" />
            )}
          </button>
        </div>
        {openLatestNews &&
          infoNews.map((info) => (
            <article
              key={info._id}
              className="relative mb-12 flex rounded-lg text-left"
            >
              <div className="md:-full absolute top-[0.25rem] right-2 z-10 inline-flex items-center justify-start space-x-2 rounded-full bg-white px-[0.5rem] py-[0.2rem] text-[0.7rem] text-text-color md:top-4 md:left-5 md:right-auto md:text-xs">
                <CalendarIcon className="h-[0.8rem] md:h-5" />
                <span>
                  {new Date(info.publishedAt).toLocaleDateString(lang, {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="hidden md:flex md:w-3/12">
                <Image
                  src={
                    info.mainImage
                      ? urlFor(info.mainImage).url()!
                      : DefaultImage
                  }
                  objectFit="cover"
                  className="w-full rounded-lg object-fill"
                  height={250}
                  width={500}
                  alt={info.title || 'Info News Image'}
                />
              </div>
              <div className="w-full px-0 md:w-9/12 md:px-5">
                <header>
                  <h1 className="mb-2 text-xl font-bold text-primary">
                    {info.title}
                  </h1>
                </header>
                <p className="text-sm md:text-base">{info.description}</p>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                  {info.tags.map((tag, i) => (
                    <span
                      key={i}
                      title={tag.description}
                      className="inline-block cursor-help rounded-[100vmax] bg-gray-200 py-[0.1rem] px-2 text-xs text-text-color md:text-sm"
                    >
                      {tag.tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex justify-start md:mt-10">
                  <Link href={`/info-news/${info.slug.current}`} className="btn-small inline-flex items-center text-sm md:text-base">
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
                  </Link>
                </div>
              </div>
            </article>
          ))}
        {openLatestNews && (
          <div className="mt-20 flex justify-center">
            <Link href="/info-news" className="btn">Read All News</Link>
          </div>
        )}
      </section>
      <section id="latest-events" className="mt-20">
        <div
          className="mb-4 flex cursor-pointer items-center justify-between border-b-2"
          onClick={() => setOpenLatestEvents(!openLatestEvents)}
        >
          <h2 className="-mb-[0.15rem] border-b-[3px] border-gray-900 text-xl font-bold md:text-2xl">
            Latest Events
          </h2>
          <button className="text-primary">
            {openLatestEvents ? (
              <ChevronUpIcon className="h-5 md:h-7" />
            ) : (
              <ChevronDownIcon className="h-5 md:h-7" />
            )}
          </button>
        </div>
        {openLatestEvents &&
          events.map((event) => (
            <article
              key={event._id}
              className="relative mb-12 flex rounded-lg text-left"
            >
              <div className="md:-full absolute top-[0.25rem] right-2 z-10 inline-flex items-center justify-start space-x-2 rounded-full bg-white px-[0.5rem] py-[0.2rem] text-[0.7rem] text-text-color md:top-4 md:left-5 md:right-auto md:text-xs">
                <CalendarIcon className="h-[0.8rem] md:h-5" />
                <span>
                  {new Date(event.selectedDateAndTime.date).toLocaleDateString(
                    lang,
                    {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    }
                  )}
                </span>
              </div>
              <div className="hidden md:flex md:w-3/12">
                <Image
                  src={
                    event.mainImage
                      ? urlFor(event.mainImage).url()!
                      : DefaultImage
                  }
                  objectFit="cover"
                  className="w-full rounded-lg object-fill"
                  height={250}
                  width={500}
                  alt={event.title || 'Event Image'}
                />
              </div>
              <div className="w-full px-0 md:w-9/12 md:px-5">
                <header>
                  <h1 className="mb-2 text-xl font-bold text-primary">
                    {event.title}
                  </h1>
                </header>
                <p className="text-sm md:text-base">{event.description}</p>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                  {event.tags.map((tag, i) => (
                    <span
                      key={i}
                      title={tag.description}
                      className="inline-block cursor-help rounded-[100vmax] bg-gray-200 py-[0.1rem] px-2 text-xs text-text-color md:text-sm"
                    >
                      {tag.tag}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-x-1">
                  <LocationMarkerIcon className="h-4 text-primary md:h-5" />
                  <small className="text-sm">{event.venue}</small>
                </div>
                <div className="mt-3 flex justify-start md:mt-5">
                  <Link href={`/event/${event.slug.current}`} className="btn-small inline-flex items-center text-sm md:text-base">
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
                  </Link>
                </div>
              </div>
            </article>
          ))}
        {openLatestEvents && (
          <div className="mt-20 flex justify-center">
            <Link href="/events" className="btn">Checkout all events</Link>
          </div>
        )}
      </section>
    </Layout>
  )
}

export default InfoEvents

export const getServerSideProps = async () => {
  const queryInfoNews = `
  *[_type=="info-news"] | order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  tags[] -> {
    tag,
    description
  },
  publishedAt,
  description,
  mainImage,
}`

  const queryEvent = `
  *[_type=="event"] | order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  description,
  mainImage,
  tags[] -> {
    tag,
    description
  },
venue,
selectedDateAndTime[0]
}`

  const infoNews = await sanityClient.fetch(queryInfoNews)
  const events = await sanityClient.fetch(queryEvent)

  return {
    props: {
      infoNews,
      events,
    },
  }
}
