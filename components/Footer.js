import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { sanityClient } from '../lib/sanityClient'
import { socialLinksData } from '../constants'

function Footer() {
  const [allTags, setAllTags] = useState([])
  const queryTag = `
  *[_type=="tag"]{
  _id,
  tag
}`
  useEffect(() => {
    const fetchData = async () => {
      const result = await sanityClient.fetch(queryTag)
      setAllTags(result)
    }

    fetchData()
  }, [])

  return (
    <footer className="w-full border-t bg-secondary">
      <div className="mx-auto flex max-w-7xl flex-col space-x-0 px-5 py-10 md:flex-row md:space-x-10 md:px-10 md:pb-0 lg:space-x-12 2xl:px-0">
        <div className="md:2/4 mb-8 w-full lg:w-2/5">
          <h1 className="text-xl font-semibold text-primary md:text-2xl">
            Vaasa Islamic Society (VIS)
          </h1>
          <p className="my-2 text-justify text-sm text-primary md:my-6 md:text-base">
            Vaasa Islamic Society aims to help its community by providing safe
            and conducive environments for everyone including new muslims and
            anyone interested in learning more about Islam. Please do visit us.
            Visit a Muslim today at Vaasa Mosque. You are welcome!
          </p>
          {/* <div className="mt-4 flex md:my-10 md:mt-10">
            <Link href="/donate">
              <a className="btn text-left">Donate</a>
            </Link>
          </div> */}
        </div>
        <div className="md:2/4 mb-8 w-full lg:w-3/6">
          <h2 className="mb-5 border-b-2 border-ascent pb-2 text-xl text-primary md:text-2xl md:font-light">
            VIS Information
          </h2>
          <div className="flex justify-between md:justify-start md:space-x-16">
            <ul className="w-2/4 space-y-2">
              <li className="text-base text-primary">
                <a href="/about-us">About Us</a>
              </li>
              <li className="text-base text-primary">
                <a href="/contact-us/#our-locations">Location</a>
              </li>
              <li className="text-base text-primary">
                <a href="/about-us">Press</a>
              </li>
            </ul>
            <ul className="w-2/4 space-y-2">
              <li className="text-base text-primary">
                <a href="/articles">Articles</a>
              </li>
              <li className="text-base text-primary">
                <a href="/contact-us/#contact-information">Contact Us</a>
              </li>
              <li className="text-base text-primary">
                <a href="/privacy">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mt-5 mb-1 text-lg font-bold text-primary">
              Locations
            </h3>
            <div className="flex justify-between md:justify-start md:space-x-16">
              <div className="w-2/4 text-primary">
                <p>Location 1</p>
                <ul className="mt-1 text-sm font-semibold">
                  <li>Palosaarentie 66,</li>
                  <li>65230 Vaasa,</li>
                  <li>Finland</li>
                </ul>
              </div>
              <div className="w-2/4 text-primary">
                <p>Location 2</p>
                <ul className="mt-1 text-sm font-semibold">
                  <li>Tiilitehtaankatu 25,</li>
                  <li>65100 Vaasa,</li>
                  <li>Finland</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-primary">
            <h3 className="mt-5 mb-1 text-lg font-bold text-primary">
              Contact Details
            </h3>
            <p>
              Phone Number:{' '}
              <span className="font-semibold">+358 46 6127473</span>
            </p>
            <p>
              Email:{' '}
              <span className="font-semibold">vaasa.moskeija@gmail.com</span>
            </p>
          </div>
        </div>

        <div className="order-last w-full md:order-none md:hidden md:w-[250px] lg:block">
          <div className="mb-5 border-b-2 border-ascent pb-2 text-xl text-primary md:text-2xl md:font-light">
            Social Media
          </div>
          <ul className="flex flex-row items-center justify-between space-y-0 md:flex-col md:items-start md:justify-start md:space-y-2">
            {socialLinksData.map(({ id, name, url, icon }) => (
              <li key={id} className="text-lg text-primary">
                <a
                  href={url}
                  target="_blank"
                  className="hidden items-center space-x-1 md:flex md:space-x-2"
                >
                  <Image src={icon.src} height="28" width="28" />
                  <span className="text-sm md:text-base">{name}</span>
                </a>
                <a
                  href={url}
                  target="_blank"
                  className="flex items-center space-x-1 md:hidden md:space-x-2"
                >
                  <Image src={icon.src} height="20" width="20" />
                  <span className="text-sm md:text-base">{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-8 w-full md:hidden md:w-2/4 lg:block">
          <h2 className="mb-5 border-b-2 border-ascent pb-2 text-xl text-primary md:text-2xl md:font-light">
            Islamic Knowledge
          </h2>
          <ul className="flex flex-wrap items-center">
            {allTags.map(({ _id, tag }) => (
              <li
                key={_id}
                className="btn mr-2 mb-3 bg-[#D0FAEA] py-1 text-sm font-medium normal-case text-primary"
              >
                <Link href="/articles">
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap">{}</ul>
        </div>
      </div>
      <div className="mb-8 -mt-4 hidden px-10 md:block lg:hidden">
        <div className="mb-8 ">
          <h2 className="mb-5 border-b-2 border-ascent pb-2 text-xl text-primary md:text-2xl md:font-light">
            Islamic Knowledge
          </h2>
          <ul className="flex flex-wrap items-center">
            {allTags.map(({ _id, tag }) => (
              <li
                key={_id}
                className="btn mr-2 mb-3 bg-[#D0FAEA] py-1 text-sm font-medium normal-case text-primary"
              >
                <Link href="/articles">
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap">{}</ul>
        </div>
        <div>
          <div className="mb-2 border-b-2 border-ascent pb-2 text-xl text-primary md:text-2xl md:font-light">
            Social Media
          </div>
          <ul className="flex items-center justify-between space-y-0 md:space-y-2">
            {socialLinksData.map(({ id, name, url, icon }) => (
              <li key={id} className="text-lg text-primary">
                <a
                  href={url}
                  target="_blank"
                  className="hidden items-center space-x-1 md:flex md:space-x-2"
                >
                  <Image src={icon.src} height="28" width="28" />
                  <span className="text-sm md:text-base"> YouTube</span>
                </a>
                <a
                  href={url}
                  target="_blank"
                  className="flex items-center space-x-1 md:hidden md:space-x-2"
                >
                  <Image src={icon.src} height="20" width="20" />
                  <span className="text-sm md:text-base">{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pb-6 text-center text-sm text-primary lg:text-base">
        &copy; Vaasa Islamic Society, {new Date().getFullYear()}
      </div>
    </footer>
  )
}

export default Footer
