// We import object and document schemas
import article from './documents/article'
import author from './documents/author'
import blockContent from './documents/blockContent'
import comment from './documents/comment'
import dateAndTime from './objects/dateAndTime'
import event from './documents/event'
import inquiry from './documents/inquiry'
import subscribe from './documents/subscribe'
import tag from './documents/tag'
import infoNews from './documents/infoNews'
import privacy from './documents/privacy'
import update from './documents/update'

import weeklyReminder from './documents/weeklyReminder'

// Export an array of schema types for Sanity v3
export default [
  article,
  author,
  blockContent,
  comment,
  dateAndTime,
  event,
  infoNews,
  inquiry,
  subscribe,
  tag,
  privacy,
  update,
  weeklyReminder,
]
