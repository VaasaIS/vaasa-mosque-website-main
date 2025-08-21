export default {
  name: 'membersList',
  title: 'Members List',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Registration ID',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'date',
      title: 'Submission Date',
      type: 'datetime',
      options: {
        dateFormat: 'DD.MM.YYYY',
        timeFormat: 'HH:mm',
      },
      readOnly: true,
    },
    {
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'gender',
      title: 'Gender',
      type: 'string',
      options: {
        list: [
          { title: 'Male', value: 'Male' },
          { title: 'Female', value: 'Female' },
        ],
      },
      readOnly: true,
    },
    {
      name: 'employmentStatus',
      title: 'Employment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Student', value: 'student' },
          { title: 'Employed', value: 'employed' },
          { title: 'Self-employed', value: 'self_employed' },
          { title: 'Unemployed', value: 'unemployed' },
          { title: 'Homemaker', value: 'homemaker' },
          { title: 'Retired', value: 'retired' },
          { title: 'Other', value: 'other' },
        ],
      },
      readOnly: true,
    },
    {
      name: 'occupation',
      title: 'Occupation / Field of Study',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'organization',
      title: 'Workplace / University',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'nationality',
      title: 'Nationality',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'ageGroup',
      title: 'Age Group',
      type: 'string',
      options: {
        list: [
          { title: 'Under 18', value: 'under_18' },
          { title: '18 - 24', value: '18_24' },
          { title: '25 - 34', value: '25_34' },
          { title: '35 - 44', value: '35_44' },
          { title: '45+', value: '45_plus' },
        ],
      },
      readOnly: true,
    },
    {
      name: 'hasSpouse',
      title: 'Has Spouse in Vaasa',
      type: 'boolean',
      readOnly: true,
    },
    {
      name: 'spouseFullName',
      title: 'Spouse Full Name',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'spouse',
      title: 'Spouse',
      type: 'object',
      fields: [
        { name: 'fullName', title: 'Full Name', type: 'string', readOnly: true },
        {
          name: 'employmentStatus',
          title: 'Employment Status',
          type: 'string',
          options: {
            list: [
              { title: 'Student', value: 'student' },
              { title: 'Employed', value: 'employed' },
              { title: 'Self-employed', value: 'self_employed' },
              { title: 'Unemployed', value: 'unemployed' },
              { title: 'Homemaker', value: 'homemaker' },
              { title: 'Retired', value: 'retired' },
              { title: 'Other', value: 'other' },
            ],
          },
          readOnly: true,
        },
        { name: 'occupation', title: 'Occupation / Field of Study', type: 'string', readOnly: true },
        { name: 'organization', title: 'Workplace / University', type: 'string', readOnly: true },
      ],
      readOnly: true,
    },
    {
      name: 'hasChildren',
      title: 'Has Children in Vaasa',
      type: 'boolean',
      readOnly: true,
    },
    {
      name: 'childrenDetails',
      title: 'Children Details',
      description: 'How many children live with you? Include their ages.',
      type: 'text',
      readOnly: true,
    },
    {
      name: 'children',
      title: 'Children',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string', readOnly: true },
            { name: 'age', title: 'Age', type: 'string', readOnly: true },
            { name: 'occupation', title: 'Occupation / School level', type: 'string', readOnly: true },
          ],
        },
      ],
      readOnly: true,
    },
    {
      name: 'gdprConsent',
      title: 'GDPR Consent',
      type: 'boolean',
      readOnly: true,
    },
    {
      name: 'muslimInVaasa',
      title: 'Muslim living in Vaasa',
      type: 'boolean',
      readOnly: true,
    },
  ],
  orderings: [
    {
      title: 'Submission Date, New',
      name: 'SubmissionDateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
}

