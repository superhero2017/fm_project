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
  Button
} from 'reactstrap';

import { colors } from '../../style-constants'

const FMDivider = ({
  text,
  ...rest
}) => {
  if (text) {
    return (
      <div className="txt text-hr">
        {text}
      </div>
    )
  } else {
    return (
      <div className="hr-line" />
    )
  }
}

export default FMDivider
