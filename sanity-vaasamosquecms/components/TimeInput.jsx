import React from 'react'
import PropTypes from 'prop-types'
import TimePicker from 'react-time-picker'
import { padStart } from 'lodash'
import { FormField, definePlugin } from 'sanity'

// 1. Import react-timepicker CSS
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'

// Helper to ensure value is always a string in HH:mm format or empty
const normalizeValue = (value) => {
  if (!value) return ''
  // If already in HH:mm, return as is
  if (/^\d{2}:\d{2}$/.test(value)) return value
  // Otherwise, try to parse
  const date = new Date(value)
  if (!isNaN(date)) {
    return date.toTimeString().slice(0, 5)
  }
  return ''
}

class TimeInput extends React.Component {
  // 5. Declare shape of React properties
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  timeInput = React.createRef()

  // 6. Called by the Sanity form-builder when this input should receive focus
  focus = () => {
    this.timeInput.current.focus()
  }

  // 7. Function called whenever an editor changes a value
  handleTimeChange = (time) => {
    const { onChange } = this.props
    // time is a string in HH:mm or null
    onChange(time || '')
  }

  render = () => {
    const { type, value } = this.props
    return (
      // 8. Use FormField if you want title and description rendered like any other input field
      <FormField label={type.title} description={type.description}>
        {/* Render TimePicker with value and onChange callback function */}
        <TimePicker
          value={normalizeValue(value)}
          onChange={this.handleTimeChange}
          disableClock={true}
          clearIcon={null}
          ref={this.timeInput}
        />
      </FormField>
    )
  }
}

export default TimeInput
