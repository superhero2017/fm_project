/* eslint-disable no-unused-vars */
import moment from 'moment'

const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

const getFormattedPrice = (price) => {
  return round(price, 2)
}

// Return true if date2 is the next day after date1
// Dates must be moments from moment.js
const isNextDay = (date1, date2) => {
  if (date2.diff(date1) === 1) {
    return true
  }
  return false
}

const isWithinWeek = (date1, date2) => {
  if (date2.diff(date1) <= 7) {
    return true
  }
  return false
}

// Checks if date is a moment, if not, return a moment of it
const getMomentFromDate = (date) => {
  if (!moment.isMoment(date)) {
    return moment(date)
  }
  return date
}

// Returns a formatted time with am/pm
const getFormattedTime = (rsvp) => {
  rsvp = getMomentFromDate(rsvp)
  return rsvp.format("h:mm a")
}

const getFormattedRsvpDeadline = (rsvp) => {
  rsvp = moment(rsvp)
  // console.log(rsvp);
  return rsvp.calendar()
}

const getFormattedServingDate = (date) => {
  date = moment(date)
  return date.calendar(null, {
    sameDay: 'h:mm a [Today]',
    nextDay: 'h:mm a [Tomorrow]',
    nextWeek: 'h:mm a [on] dddd',
    lastDay: 'h:mm a [Yesterday]',
    lastWeek: 'h:mm a [Last] dddd',
    sameElse: 'h:mm a [on] DD/MM/YYYY'
  })
}

const getFormattedCardNumber = (last4) => {
  return `**** **** **** ${last4}`
}

export {
  getFormattedPrice,
  getFormattedRsvpDeadline,
  getFormattedServingDate,
  getFormattedCardNumber,
}
