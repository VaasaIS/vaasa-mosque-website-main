import TimeInput from '../../components/TimeInput'

// Validate function which is invoked on user input
const verifyInput = (dateAndTime) => {
  const { date, startsAt, endsAt } = dateAndTime
  if (!date) {
    return 'Please select a date'
  }
  if (!startsAt) {
    return 'Choose when the event starts'
  }
  if (!endsAt) {
    return 'Choose when the event ends'
  }
  return startsAt < endsAt
    ? true
    : `Let's start the event before we end it on ${date}, shall we?`
}

export default {
  name: 'dateAndTime',
  title: 'Date and Time',
  type: 'object',

  // 4. Perform validation
  // validation: (Rule) => Rule.custom(verifyInput),

  fields: [
    {
      // 5. Enable editors to input a string of date
      name: 'date',
      type: 'date',
      description: 'Select date of our event',
      options: {
        dateFormat: 'DD.MM.YYYY',
      },
      // validation: (Rule) =>
      //   Rule.required().min(
      //     new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString()
      //   ),
    },
    {
      // Enable editors to input a point in time using a custom input component
      name: 'startsAt',
      title: 'Starts at',
      type: 'string',
      description: 'Choose when the events starts',
      inputComponent: TimeInput,
      validation: (Rule) => Rule.required(),
    },
    {
      // Same time input as above, but assigned to a different field
      name: 'endsAt',
      title: 'Ends at',
      type: 'string',
      description: 'Choose when the event ends',
      inputComponent: TimeInput,
      validation: (Rule) => Rule.required(),
    },
  ],

  // Define how the dateAndTime object will render in the Studio
  preview: {
    select: {
      date: 'date',
      startsAt: 'startsAt',
      endsAt: 'endsAt',
    },
    prepare({ date, startsAt, endsAt }) {
      return {
        title: date,
        subtitle: `${startsAt} - ${endsAt}`,
      }
    },
  },
}
