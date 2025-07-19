import Head from 'next/head'

import Header from './Header'
import HeroGeneric from './HeroGeneric'
import Subscribe from './Subscribe'
import Footer from './Footer'

import { urlFor } from '../lib/sanityClient'

interface LayoutProps {
  children: JSX.Element[] | JSX.Element
  pageTitle?: string
  slugType?: string
  slug: {
    mainImage: {
      asset: { url: string }
    }
  }
}

const Layout = ({ children, pageTitle, slug, slugType }: LayoutProps) => {
  return (
    <div className="layout">
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {slug.mainImage ? (
        <img
          className="object-cover w-full h-40"
          src={urlFor(slug.mainImage).url()!}
          alt={`${slugType} main image`}
        />
      ) : (
        <HeroGeneric title="" />
      )}
      <main className="px-5 mx-auto max-w-7xl md:px-10 xl:px-0">
        {children}
      </main>
      <Subscribe />
      <Footer />
    </div>
  )
}

export default Layout
