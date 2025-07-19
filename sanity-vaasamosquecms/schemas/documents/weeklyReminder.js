export default {
  name: 'reminder',
  title: 'Weekly Reminders',
  type: 'document',
  fields: [
    {
      name: 'weeklyReminderImage',
      description: 'Recommended image size is 800x600',
      title: 'Weekly Reminder',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
  ],

  preview: {
    select: {
      date: '_createdAt',
      media: 'weeklyReminderImage',
    },
    prepare(selection) {
      const { media, date } = selection
      return {
        title: `Weekly reminder-${date.slice(0, 10).replaceAll('-', '')}`,
        media: media,
      }
    },
  },
}
