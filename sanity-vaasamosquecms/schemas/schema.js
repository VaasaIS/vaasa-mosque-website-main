// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import article from './documents/article'
import author from './documents/author'
import blockContent from './/documents/blockContent'
import comment from './documents/comment'
import dateAndTime from './objects/dateAndTime'
import event from './documents/event'
import inquiry from './documents/inquiry'
import subscribe from './documents/subscribe'
import tag from './documents/tag'
import infoNews from './documents/infoNews'
import privacy from './documents/privacy'

import weeklyReminder from './documents/weeklyReminder'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    article,
    author,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    comment,
    dateAndTime,
    event,
    infoNews,
    inquiry,
    subscribe,
    tag,
    privacy,
    weeklyReminder,
  ]),
})
