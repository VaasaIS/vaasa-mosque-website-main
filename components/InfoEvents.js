import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {
  DocumentTextIcon,
  VolumeUpIcon,
  VideoCameraIcon,
} from '@heroicons/react/solid'

const transformer = (type) => {
  switch (type) {
    case 'audio':
      return <VolumeUpIcon className="mr-1 h-5" />
    case 'video':
      return <VideoCameraIcon className="mr-1 h-5" />
    case 'text':
      return <DocumentTextIcon className="mr-1 h-5" />
    default:
      return <VideoCameraIcon className="mr-1 h-5" />
  }
}

import { updates } from '../constants'

import InfoEventImage from '../assets/info-events.png'
import Event1 from '../assets/event-1.png'
import Event2 from '../assets/event-2.png'

const InfoEvents = () => {
  return (
    <section className="mx-auto mt-16 mb-10 flex max-w-7xl flex-col space-x-0 space-y-8 md:flex-row md:space-y-0 md:space-x-8 lg:mt-24 lg:space-x-20">
      <div className="w-full md:w-9/12">
        <div className="mb-3 flex items-center justify-between lg:mb-6">
          <p className="text-2xl font-bold text-text-color md:text-3xl lg:text-4xl">
            Info & Events
          </p>
          <Link
            href={{
              pathname: '/info-events/',
              query: { keyword: 'openLatestEvents' },
            }}
            as="/info-events/#latest-events"
            className="btn-small"
          >
            See all
          </Link>
        </div>
        <div className="relative mb-5">
          <Image src={InfoEventImage} alt="info image" style={{ objectFit: 'cover' }} />
          <a
            className="btn absolute bottom-12 right-6 bg-white text-sm text-primary md:right-16 md:bottom-20 md:text-base lg:bottom-36"
            href="/events"
          >
            Join
          </a>
        </div>

        <div className="flex space-x-6">
          <div className="w-1/2">
            <Image src={Event1} alt="info image" style={{ objectFit: 'cover' }} />
            <p className="text-left text-sm text-text-color lg:text-lg">
              Vaasa Islamic Society (VIS) provides a supportive space for
              worship, learning, and connection among Muslims in the region.
            </p>
          </div>
          <div className="w-1/2">
            <Image src={Event2} alt="info image" style={{ objectFit: 'cover' }} />
            <p className="text-left text-sm text-text-color lg:text-lg">
              Vaasa Islamic Society (VIS) actively promotes peaceful coexistence
              among individuals of different backgrounds and faiths.
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col md:w-3/12">
        <p className="mb-1 text-left text-2xl font-bold text-text-color md:text-3xl lg:mb-4 lg:text-4xl">
          Updates
        </p>

        <ul className="mb-3">
          {updates.map(({ id, title, type, url, duration }) => (
            <li
              key={id}
              className="py-1 font-medium text-text-color lg:py-2 lg:text-lg"
            >
              <a
                href={url}
                target="_blank"
                className="flex items-center justify-between"
              >
                {title}
                <span className="font-sm ml-2 flex items-center text-xs lg:text-base">
                  {transformer(type)} {duration}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <Link
          href={{
            pathname: '/articles/',
            query: { keyword: 'openAudiosVideos' },
          }}
          as="/articles/#all-audios-texts-videos"
          className="btn-small mt-4 self-start md:mt-8"
        >
          See all updates
        </Link>
      </div>
    </section>
  )
}

export default InfoEvents
