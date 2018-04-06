/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Control, } from 'react-redux-form'
import {
  Button as UIButton,
  Dropdown as UIDropdown,
  Label as UILabel,
  Menu as UIMenu,
} from 'semantic-ui-react'

import {
  isRequired,
  isNumber,
  isPositiveNumber,
  requiredError,
} from '../lib/validators'

const FMDropdown = ({
  model,
  options,
  placeholder,
  // validators,
  ...rest
}) => {

    const mapOptions = (options) => {
      return options.map((o) => {
        return (
          <option key={o.value} value={o.value}>
            {o.text}
          </option>
        )
      })
    }
    // const validators =

    // default text color
     // style={{color: "rgba(191,191,191,.87)"}}
  return (
    <div>
    <Control.select
      model={model}
      {...rest}
    >
      <option value="" disabled selected hidden>
        {placeholder}
      </option>
      {mapOptions(options)}
    </Control.select>
    </div>
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

export default FMDropdown
