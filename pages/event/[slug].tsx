import Link from 'next/link'
import { format } from 'date-fns'
import { GetStaticProps } from 'next'

import LayoutSlug from '../../components/LayoutSlug'

import type { Event } from '../../typings'
import PortableText from 'react-portable-text'
import { sanityClient } from '../../lib/sanityClient'
import {
  CalendarIcon,
  ClockIcon,
  LocationMarkerIcon,
} from '@heroicons/react/outline'

interface Props {
  event: Event
}

function Event({ event }: Props) {
  let selectedLang = 'en'
  let lang = 'en-gb'
  selectedLang === 'en' ? lang : (lang = 'fi-FI')

  return (
    <LayoutSlug
      pageTitle={`${event.title} | Vaasa Islamic Society`}
      slug={event}
      slugType={'event'}
    >
      <article className="mx-auto max-w-5xl">
        <div className="mt-10 mb-3 flex items-center justify-between">
          <h1 className="text-3xl">{event.title}</h1>{' '}
          <Link href="/events" className="btn-small inline-flex items-center text-xs md:text-base">
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
            All Events
          </Link>
        </div>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {event.description}
        </h2>
        <div className="mt-7">
          <div className="mb-2 flex items-center gap-x-1">
            <LocationMarkerIcon className="h-4 text-primary md:h-5" />
            <span className="text-sm font-semibold text-text-color">
              Venue:{' '}
            </span>
            <small className="text-sm text-text-color">{event.venue}</small>
          </div>

          <div className="mb-2 flex items-center gap-x-1">
            <CalendarIcon className="h-4 text-primary md:h-5" />
            <span className="text-sm font-semibold text-text-color">
              Date:{' '}
            </span>
            <small className="text-sm text-text-color">
              {format(new Date(event.selectedDateAndTime.date), 'dd.MM.yyyy')}
            </small>
          </div>

          <div className="mb-2 flex items-center gap-x-1">
            <ClockIcon className="h-4 text-primary md:h-5" />
            <span className="text-sm font-semibold text-text-color">
              Time:{' '}
            </span>
            <small className="text-sm text-text-color">
              {event.selectedDateAndTime.startsAt} -{' '}
              {event.selectedDateAndTime.endsAt}
            </small>
          </div>
        </div>
        <div className="mt-7">
          <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={event.body}
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
    </LayoutSlug>
    // <>
    //   <main>
    //     <Header />
    //     {event.mainImage ? (
    //       <img
    //         className="object-cover w-full h-40"
    //         src={urlFor(event.mainImage).url()!}
    //         alt="article main image"
    //       />
    //     ) : (
    //       <HeroGeneric title="" />
    //     )}

    //     <article className="max-w-3xl p-5 mx-auto">
    //       <div className="flex items-center justify-between mt-10 mb-3">
    //         <h1 className="text-3xl">{event.title}</h1>{' '}
    //         <Link href="/events">
    //           <a className="inline-flex items-center text-xs btn-small md:text-base">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className="w-4 h-4 mr-2 -ml-1"
    //               viewBox="0 0 20 20"
    //               fill="currentColor"
    //             >
    //               <path
    //                 fillRule="evenodd"
    //                 d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
    //                 clipRule="evenodd"
    //               />
    //             </svg>
    //             All Events
    //           </a>
    //         </Link>
    //       </div>
    //       <h2 className="mb-2 text-xl font-light text-gray-500">
    //         {event.description}
    //       </h2>
    //       <div className="mt-7">
    //         <div className="flex items-center mb-2 gap-x-1">
    //           <LocationMarkerIcon className="h-4 text-primary md:h-5" />
    //           <small className="text-xs text-text-color md:text-sm">
    //             {event.venue}
    //           </small>
    //         </div>

    //         <div className="flex items-center mb-2 gap-x-1">
    //           <CalendarIcon className="h-4 text-primary md:h-5" />
    //           <small className="text-xs text-text-color md:text-sm">
    //             {event.selectedDateAndTime.date}
    //           </small>
    //         </div>

    //         <div className="flex items-center mb-2 gap-x-1">
    //           <ClockIcon className="h-4 text-primary md:h-5" />
    //           <small className="text-xs text-text-color md:text-sm">
    //             {event.selectedDateAndTime.startsAt} -{' '}
    //             {event.selectedDateAndTime.endsAt}
    //           </small>
    //         </div>
    //       </div>
    //       <div className="mt-7">
    //         <PortableText
    //           className=""
    //           dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
    //           projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
    //           content={event.body}
    //           serializers={{
    //             h1: (props: any) => (
    //               <h1 className="mt-5 mb-0 text-2xl font-bold" {...props} />
    //             ),
    //             h2: (props: any) => (
    //               <h2 className="mt-4 mb-0 text-xl font-bold" {...props} />
    //             ),
    //             normal: (props: any) => (
    //               <p className="inline-block my-3 text-justify" {...props} />
    //             ),
    //             li: ({ children }: any) => (
    //               <li className="ml-8 list-disc">{children}</li>
    //             ),
    //             link: ({ href, children }: any) => (
    //               <a
    //                 href={href}
    //                 target="_blank"
    //                 className="text-blue-500 hover:underline"
    //               >
    //                 {children}
    //               </a>
    //             ),
    //           }}
    //         />
    //       </div>
    //     </article>
    //   </main>

    //   <Subscribe />
    //   <Footer />
    // </>
  )
}

export default Event

export const getStaticPaths = async () => {
  const query = `*[_type == "article"]{
    _id,
    slug {
      current
    }
  }`

  const event = await sanityClient.fetch(query)
  const paths = event.map((event: Event) => ({
    params: {
      slug: event.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "event" && slug.current == $slug][0]{
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
    selectedDateAndTime[0],
    body
}`

  const event = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!event) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      event,
    },
    revalidate: 300, // new content every 5 minutes
  }
}
