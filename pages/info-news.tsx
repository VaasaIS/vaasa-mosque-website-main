import Image from 'next/image'
import Link from 'next/link'

import Layout from '../components/Layout'

import { CalendarIcon } from '@heroicons/react/outline'

import { sanityClient, urlFor } from '../lib/sanityClient'
import { InfoNews } from '../typings'

import DefaultImage from '../assets/default-image.png'

interface Props {
  infoNews: [InfoNews]
}

const InfoEvents = ({ infoNews }: Props) => {
  let selectedLang = 'en'
  let lang = 'en-gb'

  selectedLang === 'en' ? lang : (lang = 'fi-FI')
  return (
    <Layout
      pageTitle="Info &amp; News | Vaasa Islamic Society"
      title="All Info &amp; News"
    >
      <section id="latest-news" className="mt-16">
        {infoNews.map((info) => (
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
                  info.mainImage ? urlFor(info.mainImage).url()! : DefaultImage
                }
                objectFit="cover"
                className="w-full rounded-lg object-fill"
                height={250}
                width={500}
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
      </section>
    </Layout>
  )
}

export default InfoEvents

export const getServerSideProps = async () => {
  const query = `
  *[_type=="info-news"] | order(publishedAt desc){
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

  const infoNews = await sanityClient.fetch(query)

  return {
    props: {
      infoNews,
    },
  }
}
