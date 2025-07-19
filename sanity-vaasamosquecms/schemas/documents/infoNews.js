export default {
  name: 'info-news',
  title: 'Info & News',
  description:
    'Please fill out all the required details for the information/news',
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
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      options: {
        dateFormat: 'DD.MM.YYYY',
        timeFormat: 'HH:mm',
      },
      validation: (Rule) =>
        Rule.required().min(
          new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString()
        ),
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      title: 'Info/News',
      description: 'Details about the info/news.',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    },
  ],

  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedDateDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'publishedAt',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, date, media } = selection
      return {
        title: `${title.slice(0, 8)}...${title.slice(
          title.length - 8,
          title.length
        )}_${date.slice(0, 10).replaceAll('-', '')}`,
        media: media,
      }
    },
  },
}
