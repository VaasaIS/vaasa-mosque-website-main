export default {
  name: 'dvvDocument',
  title: 'DVV Documents',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Document Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'documentFile',
      title: 'Document File',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx',
        storeOriginalFilename: true,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'uploadedBy',
      title: 'Uploaded By',
      type: 'string',
      description: 'Name or identifier of who uploaded the document',
    },
    {
      name: 'uploadDate',
      title: 'Upload Date',
      type: 'datetime',
      options: {
        dateFormat: 'DD.MM.YYYY',
        timeFormat: 'HH:mm',
      },
      readOnly: true,
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending Review', value: 'pending' },
          { title: 'Under Review', value: 'reviewing' },
          { title: 'Processed', value: 'processed' },
          { title: 'Rejected', value: 'rejected' },
        ],
      },
      initialValue: 'pending',
    },
    {
      name: 'notes',
      title: 'Admin Notes',
      type: 'text',
      description: 'Internal notes for document processing',
    },
    {
      name: 'fileSize',
      title: 'File Size',
      type: 'string',
      description: 'Size of the uploaded file',
      readOnly: true,
    },
    {
      name: 'fileType',
      title: 'File Type',
      type: 'string',
      description: 'MIME type of the uploaded file',
      readOnly: true,
    },
  ],
  orderings: [
    {
      title: 'Upload Date, New',
      name: 'uploadDateDesc',
      by: [{ field: 'uploadDate', direction: 'desc' }],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      uploadDate: 'uploadDate',
      media: 'documentFile',
      fileType: 'fileType',
    },
    prepare(selection) {
      const { title, status, uploadDate, media, fileType } = selection
      return {
        title: title,
        subtitle: `${status} - ${fileType || 'File'} - ${uploadDate ? new Date(uploadDate).toLocaleDateString('fi') : 'No date'}`,
        media: media,
      }
    },
  },
} 