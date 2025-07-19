import { useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'

import { runFireworks } from '../lib/utils'

const Success = () => {
  useEffect(() => {
    runFireworks()
  }, [])

  return (
    <Layout
      pageTitle="Successful Donation | Vaasa Islamic Society"
      title="Successful Donation"
    >
      <section className="my-16 flex flex-col items-center justify-center">
        <div className="mb-4 text-5xl md:text-7xl">🙏</div>
        <h2 className="text-xl font-medium text-text-color md:text-3xl">
          Jazaakumullahu Khayran for your Donation!
        </h2>
        <p className="mt-[2px] text-sm md:text-lg">
          Check your inbox for the receipt.
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
            Donate Again
          </button>
        </Link>
      </section>
    </Layout>
  )
}

export default Success
