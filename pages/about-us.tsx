import Image from 'next/image'

import Layout from '../components/Layout'
import Officials from '../components/Officials'

import AboutUsImg from '../assets/about-us-img.png'

const AboutUs = () => {
  return (
    <Layout pageTitle="About Us | Vaasa Islamic Society" title="About Us">
      <section className="mt-0 flex flex-col gap-2 md:my-20 md:flex-row">
        <div className="w-full md:w-1/2 md:pr-10">
          <Image
            src={AboutUsImg}
            objectFit="cover"
            className="rounded-none object-fill md:rounded-lg"
          />
        </div>
        <div className="mb-10 w-full p-0 text-justify md:mb-0 md:w-1/2 md:text-left">
          Vaasa Islamic Society (Vaasan alueen Islamilainen Yhdyskunta) was
          established in 1998 by our founding members. It is located in
          Ostrobothnia region and lies in the heart of Vaasa city. Vaasa Islamic
          Society currently manages two mosques in Vaasa, one in Palosaarentie
          66 and the other in Tiilitehtaankatu 25a. In addition to mosque, the
          society also organizes Islamic educational programs for kids in
          summer, Ramadan activities, and the two Eid festivals.
        </div>
      </section>
      <section className="mt-4 flex flex-col items-stretch p-0 md:mt-24 md:flex-row">
        <div className="mb-12 w-full md:w-1/3">
          <div className="mb-5 text-center text-3xl font-bold md:mb-8">
            Values
          </div>
          <ul>
            <li className="bg-primary p-8 py-10 text-xl font-bold text-white">
              Peaceful co-existence
            </li>
            <li className="text-color bg-[#9CDFC7] p-8 py-10 text-xl font-bold">
              Trust and Safety
            </li>
            <li className="text-color bg-secondary p-8 py-10 text-xl font-bold">
              Community
            </li>
          </ul>
        </div>
        <div className="mb-12 flex w-full flex-col md:w-1/3">
          <div className="mb-5 text-center text-3xl font-bold md:mb-8">
            Mission
          </div>
          <p className="flex-1 bg-secondary px-8 py-5 text-text-color">
            {/* <p className="text-text-color-variant flex flex-1 items-center justify-center bg-ascent px-8 py-5 text-center text-2xl"> */}
            Vaasa Islamic Society mission is to develop Muslim community,
            co-existential relationship with other communities, and work toward
            developing understanding of Islam in Vaasa.
          </p>
        </div>
        <div className="mb-12 flex w-full flex-col md:w-1/3">
          <div className="mb-5 text-center text-3xl font-bold md:mb-8">
            Vision
          </div>
          <p className="flex-1 bg-secondary px-8 py-5 text-text-color">
            {/* <p className="text-text-color-variant flex flex-1 items-center justify-center bg-secondary px-8 py-5 text-center text-2xl"> */}
            Our vision is to be a society who will strive to work for the
            problems of Muslim community in Vaasa and communicate true
            understanding of Islamic knowledge in Vaasa
          </p>
        </div>
      </section>
      <section className="mt-0 pt-4 md:mt-16">
        <div className="mb-6 text-2xl font-bold uppercase md:text-3xl">
          gallery
        </div>
        <div className="xs:grid-cols-2 xs:p-8 grid gap-4 md:grid-cols-4 lg:gap-6">
          <p className="xs:row-start-2 xs:col-start-2 xs:self-center md:col-span-2 md:col-start-1 md:pr-12 md:text-lg">
            We have varieties of activities at our center. You can join our
            weekly Jumah Service, study the Deen and ...
          </p>
          <div className="xs:h-auto xs:square h-32 bg-ascent"></div>
          <div className="xs:h-auto xs:square h-32 bg-ascent"></div>
          <div className="xs:h-auto xs:square h-32 bg-secondary"></div>
          <div className="xs:h-auto xs:square h-32 bg-ascent md:col-start-2"></div>
          <div className="xs:h-auto xs:square h-32 bg-secondary"></div>
          <div className="xs:h-auto xs:square h-32 overflow-hidden bg-ascent">
            <Image src={AboutUsImg} objectFit="cover" />
          </div>
          <div className="xs:h-auto xs:square h-32 bg-ascent"></div>
          <div className="xs:h-auto xs:square h-32 bg-secondary"></div>
          <p className="self-center md:col-span-2 md:px-4 md:text-right md:text-lg">
            ...you or you kids can join the weekly Quran reading and
            memorization classes.
          </p>
        </div>
        <button className="btn-small mt-12" type="submit">
          See all
        </button>
      </section>
      <section className="mt-20 md:my-24">
        <Officials />
      </section>
    </Layout>
  )
}

export default AboutUs
