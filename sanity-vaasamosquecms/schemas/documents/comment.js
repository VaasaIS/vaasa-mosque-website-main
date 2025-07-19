export default {
  name: 'comment',
  title: 'Comments',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: "Comments won't show on the site without approval",
    },
    {
      name: 'email',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'comment',
      type: 'text',
      readOnly: true,
    },
    {
      name: 'article',
      type: 'reference',
      to: [{ type: 'article' }],
      readOnly: true,
    },
  ],
}
