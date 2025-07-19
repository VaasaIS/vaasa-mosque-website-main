import React from 'react'
import Link from 'next/link'

import Layout from '../components/Layout'

const Cancelled = () => {
  return (
    <Layout
      pageTitle="Cancelled Donation | Vaasa Islamic Society"
      title="Cancelled Donation"
    >
      <section className="my-16 flex flex-col items-center justify-center">
        <div className="mb-4 text-5xl md:text-7xl">😔</div>
        <h2 className="text-xl font-medium text-text-color md:text-3xl">
          Just cancelled your donation?
        </h2>
        <p className="mt-[2px] text-sm md:text-lg">
          Why not try <span className="font-bold text-primary">Again?</span>
        </p>
        <div className="text-center">
          <h3 className="mt-4 text-sm font-light md:text-base">
            For any enquiries, please email{' '}
            <a
              className="font-bold text-primary"
              href="mailto:vaasa.moskeija@gmail.com"
            >
              vaasa.moskeija@gmail.com
            </a>
          </h3>
        </div>
        <Link href="/donate">
          <button type="button" className="btn mt-10">
            Donate
          </button>
        </Link>
      </section>
    </Layout>
  )
}

export default Cancelled
