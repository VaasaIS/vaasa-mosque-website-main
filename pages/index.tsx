import type { Article, WeeklyReminder } from '../typings'
import { sanityClient, urlFor } from '../lib/sanityClient'

import Donate from '../components/Donate'
import InfoEvents from '../components/InfoEvents'
import Layout from '../components/Layout'
import RecentArticles from '../components/RecentArticles'

interface Props {
  articles: [Article]
  weeklyReminderImage: WeeklyReminder
}

const Home = ({ articles, weeklyReminderImage }: Props) => {
  return (
    <Layout
      page="home"
      pageTitle="Home | Vaasa Islamic Society"
      weeklyReminderImage={weeklyReminderImage}
    >
      <InfoEvents />
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

  const articles = await sanityClient.fetch(queryArticle)
  const weeklyReminderImage = await sanityClient.fetch(queryWeeklyReminder)

  return {
    props: {
      articles,
      weeklyReminderImage,
    },
  }
}
