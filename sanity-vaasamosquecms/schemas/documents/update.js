export default {
  name: 'update',
  title: 'Updates',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Video', value: 'video' },
          { title: 'Audio', value: 'audio' },
          { title: 'Text', value: 'text' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Duration in format MM:SS (e.g., 10:24)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Link to the content (YouTube, article, etc.)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional description of the update',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this update should be displayed',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this update should appear (lower numbers appear first)',
      initialValue: 0,
    },
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      duration: 'duration',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const { title, type, duration, publishedAt } = selection
      return {
        title: title,
        subtitle: `${type} • ${duration} • ${new Date(publishedAt).toLocaleDateString()}`,
      }
    },
  },
} 