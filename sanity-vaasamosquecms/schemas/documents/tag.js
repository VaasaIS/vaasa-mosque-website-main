export default {
  name: 'tag',
  title: 'Tags',
  type: 'document',
  fields: [
    {
      name: 'tag',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      description: 'Keep this short and catchy!',
      type: 'text',
      options: {
        maxLength: 85,
      },
    },
  ],
}
