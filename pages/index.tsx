import type { Article, WeeklyReminder, Update } from '../typings'
import { sanityClient, urlFor } from '../lib/sanityClient'

import Donate from '../components/Donate'
import InfoEvents from '../components/InfoEvents'
import Link from 'next/link'
import Layout from '../components/Layout'
import RecentArticles from '../components/RecentArticles'
import Updates from '../components/Updates'

interface Props {
  articles: [Article]
  weeklyReminderImage: WeeklyReminder
  updates: Update[]
}

const Home = ({ articles, weeklyReminderImage, updates }: Props) => {
  return (
    <Layout
      page="home"
      pageTitle="Home | Vaasa Islamic Society"
      weeklyReminderImage={weeklyReminderImage}
    >
      <div className="mx-auto mb-6 flex items-center justify-center">
        <Link href="/newcomers" className="btn">
          Newcomers Guide
        </Link>
      </div>
      <InfoEvents />
      <Updates updates={updates} />
      {/* <Donate /> */}
      <RecentArticles articles={articles} urlFor={urlFor} />
    </Layout>
  )
}

export default Home

export const getServerSideProps = async () => {
  const queryArticle = `
  *[_type=="article"] | order(publishedAt desc)[0...4]{
  _id,
  title,
  slug,
  publishedAt,
  description,
  mainImage,
}`

  const queryWeeklyReminder = `
  *[_type=="reminder"] | order(_createdAt desc)[0]{
    weeklyReminderImage,        
  }`

  const queryUpdates = `
  *[_type=="update" && isActive == true] | order(order asc, publishedAt desc)[0...10]{
    _id,
    title,
    type,
    duration,
    url,
    description,
    publishedAt,
    isActive,
    order,
  }`

  const articles = await sanityClient.fetch(queryArticle)
  const weeklyReminderImage = await sanityClient.fetch(queryWeeklyReminder)
  const updates = await sanityClient.fetch(queryUpdates)

  return {
    props: {
      articles,
      weeklyReminderImage,
      updates,
    },
  }
}
