export default {
  name: 'inquiry',
  title: 'Inquiries',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Inquiry ID',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'date',
      title: 'Inquiry Date',
      type: 'datetime',
      options: {
        dateFormat: 'DD.MM.YYYY',
        timeFormat: 'HH:mm',
      },
      readOnly: true,
    },
    {
      name: 'firstName',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'lastName',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'email',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'phoneNumber',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'message',
      type: 'text',
      readOnly: true,
    },
    {
      name: 'image',
      title: 'Inquiry Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      readOnly: true,
    },
    {
      name: 'category',
      type: 'string',
      readOnly: true,
    },
  ],

  orderings: [
    {
      title: 'Inquiry Date, New',
      name: 'InquiryDateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
}
