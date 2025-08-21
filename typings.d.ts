export interface Article {
  _id: string
  publishedAt: string
  title: string
  slug: { current: string }
  comments: comment[]
  description: string
  mainImage: {
    asset: { url: string }
  }
  author: {
    name: string
    image: string
  }
  body: [object]
}

export interface Privacy {
  _id: string
  publishedAt: string
  title: string
  description: string
  mainImage: {
    asset: { url: string }
  }
  body: [object]
}

export interface Tag {
  tags: string
  description: string
}

export interface Event {
  _id: string
  title: string
  slug: { current: string }
  tags: tag[]
  selectedDateAndTime: {
    date: string
    endsAt: string
    startsAt: string
  }
  venue: string
  description: string
  mainImage: {
    asset: { url: string }
  }
  body: [object]
}

export interface InfoNews {
  _id: string
  publishedAt: string
  title: string
  slug: { current: string }
  tags: tag[]
  description: string
  mainImage: {
    asset: { url: string }
  }
  body: [object]
}

export interface Comment {
  approved: boolean
  comment: string
  email: string
  name: string
  article: {
    _ref: string
    _type: string
  }
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
}

export interface WeeklyReminder {
  _id: string
  weeklyReminderImage: {
    asset: { url: string }
  }
  _createdAt: string
  _rev: string
  _type: string
  _updatedAt: string
  publishedAt: string
}

export interface Update {
  _id: string
  title: string
  type: 'video' | 'audio' | 'text'
  duration: string
  url: string
  description?: string
  publishedAt: string
  isActive: boolean
  order: number
}
