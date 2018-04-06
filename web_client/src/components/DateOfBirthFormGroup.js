/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter, } from 'react-router-dom'
import { Control, } from 'react-redux-form'
import {
  Button as UIButton,
  Container as UIContainer,
  Divider as UIDivider,
  Dropdown as UIDropdown,
  Form as UIForm,
  Grid as UIGrid,
  Header as UIHeader,
  Icon as UIIcon,
  Image as UIImage,
  Input as UIInput,
  Label as UILabel,
  List as UIList,
  Menu as UIMenu,
  Message as UIMessage,
  Segment as UISegment,
  Table as UITable,
} from 'semantic-ui-react'
import moment from 'moment'

import {
  getProfilePath,
  getEditProfilePath,
  getEditProfilePhotosPath,
  getEditVerificationPath,
} from '../urls'

import {
  isRequired,
  isNumber,
  isPositiveNumber,
  requiredError,
  modelError,
} from '../lib/validators'

import FMDropdown from '../components/FMDropdown'

const DateOfBirthFormGroup = ({ form }) => {

    const theCurrentYear = moment().get('year')
    const monthOptions = moment.months()
      .map((month, index) => {
        return {
          text: month,
          value: index,
        }
      })
    const dateOptions = [...Array(31).keys()]
      .map((index) => {
        return {
          text: index + 1,
          value: index + 1,
        }
      })
    const yearOptions = [...Array(100).keys()]
      .map((index) => {
        return {
          text: theCurrentYear - index,
          value: theCurrentYear - index
        }
      })

    const mapOptions = (options) => {
      return options.map((o) => {
        return (
          <option key={o.value} value={o.value}>
            {o.text}
          </option>
        )
      })
    }


  return (
    <UIForm.Group inline>
      <UIForm.Field
        error={modelError(form.dob_month)}
      >
        <FMDropdown
          model=".dob_month"
          placeholder="Month"
          options={monthOptions}
          validators={{
            isRequired,
          }}
        />

      </UIForm.Field>
      <UIForm.Field
        error={modelError(form.dob_date)}
      >
        <FMDropdown
          model=".dob_date"
          placeholder="Date"
          options={dateOptions}
          validators={{
            isRequired,
          }}
        />
      </UIForm.Field>
      <UIForm.Field
        error={modelError(form.dob_year)}
      >
        <FMDropdown
          model=".dob_year"
          placeholder="Year"
          options={yearOptions}
          validators={{
            isRequired,
          }}
        />
      </UIForm.Field>
    </UIForm.Group>
  )
}

// DateOfBirthFormGroup.propTypes = {
//   userId: PropTypes.number.isRequired,
//   location: PropTypes.shape({
//     pathname: PropTypes.string.isRequired,
//   }).isRequired
//   // also uses router props
//   // routerProps: PropTypes.object,
// }

export default DateOfBirthFormGroup
