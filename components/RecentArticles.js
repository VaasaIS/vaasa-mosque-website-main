import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { CalendarIcon } from '@heroicons/react/outline'

function RecentArticles({ articles, urlFor }) {
  let selectedLang = 'en'
  let lang = 'en-gb'
  selectedLang === 'en' ? lang : (lang = 'fi-FI')
  return (
    <section className="mx-auto my-16 max-w-7xl">
      <p className="mb-8 text-2xl font-bold text-center text-text-color md:mb-10 md:text-3xl lg:mb-12 lg:text-4xl">
        Recent Articles
      </p>
      <div className="!ml-0 grid grid-flow-row-dense gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {articles.map((article) => (
          <article
            key={article._id}
            className="relative flex flex-col rounded-lg bg-[#F4F5F4] text-left"
          >
            <div className="absolute top-4 left-5 z-10 flex items-center space-x-2 rounded-full bg-white px-[0.5rem] py-[0.2rem] text-xs text-text-color">
              <CalendarIcon className="h-5" />
              <span>
                {new Date(article.publishedAt).toLocaleDateString(lang, {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
            <Image
              src={article.mainImage && urlFor(article.mainImage).url()}
              height={300}
              width={500}
              className="rounded-t-lg object-cover"
            />
            <div className="flex flex-col flex-1 p-5">
              <header>
                <h1 className="mb-4 text-xl font-bold text-primary">
                  {article.title}
                </h1>
              </header>
              <p className="flex-1 text-md">
                {article.description && article.description.slice(0, 69)}...
              </p>
              <div className="flex justify-start mt-10">
                <Link href={`/article/${article.slug.current}`} className="inline-flex items-center btn-small">
                  Read More
                  <svg
                    className="w-4 h-4 ml-2 -mr-1"
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
      </div>

      <div className="flex justify-center mt-20">
        <Link href="/articles" className="btn">Read All Articles</Link>
      </div>
    </section>
  )
}

export default RecentArticles
