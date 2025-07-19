import Head from 'next/head'

import Header from './Header'
import Hero from './Hero'
import HeroGeneric from './HeroGeneric'
import Subscribe from './Subscribe'
import Footer from './Footer'
import { WeeklyReminder } from '../typings'

import { urlFor } from '../lib/sanityClient'

interface LayoutProps {
  children: JSX.Element[] | JSX.Element
  pageTitle?: string
  title?: string
  page?: string
  weeklyReminderImage?: WeeklyReminder
}

const Layout = ({
  children,
  pageTitle,
  title,
  page,
  weeklyReminderImage,
}: LayoutProps) => {
  return (
    <div className="layout">
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {page === 'home' ? (
        <Hero weeklyReminderImage={weeklyReminderImage} urlFor={urlFor} />
      ) : (
        <HeroGeneric title={title} />
      )}
      <main className="px-5 mx-auto max-w-7xl md:px-10 2xl:px-0">
        {children}
      </main>
      <Subscribe />
      <Footer />
    </div>
  )
}

export default Layout
