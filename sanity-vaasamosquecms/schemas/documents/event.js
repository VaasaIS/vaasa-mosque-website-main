export default {
  name: 'event',
  title: 'Events',
  description: 'Please fill out all the required information for the event',
  type: 'document',

  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'keep titles short!',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'selectedDateAndTime',
      title: 'Event date and time',
      type: 'array',
      of: [{ type: 'dateAndTime' }],
      // validation: (Rule) => Rule.required().max(1),
    },

    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'venue',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Tag(s)',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      title: 'More information',
      description: 'Additional information about the event.',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    },
  ],

  orderings: [
    {
      title: 'Event Date, New',
      name: 'eventDateDesc',
      by: [{ field: 'selectedDateAndTime[0].date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'selectedDateAndTime',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, date, media } = selection
      return {
        title: `${title.slice(0, 8)}...${title.slice(
          title.length - 8,
          title.length
        )}_${date[0].date.replaceAll('-', '')}`,
        media: media,
      }
    },
  },
}
