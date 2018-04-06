/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Control, } from 'react-redux-form'
import {
  Button as UIButton,
  Dropdown as UIDropdown,
  Icon as UIIcon,
  Label as UILabel,
  Menu as UIMenu,
} from 'semantic-ui-react'
import {
  Button
} from 'reactstrap';

import { colors } from '../../style-constants'

const FMButton = ({
  color,
  children,
  fb,
  block,
  disabled,
  ...rest
}) => {
  // Should we use reactstrap button?
  let classes = "txt btn btn-primary "
  if (block) {
    classes += "btn-block "
  }
  if (disabled) {
    classes += "disabled "
  }
  if (fb) {
    classes += "btn-fb "
    return (
      <button className={classes} style={{alignItems: "center"}} {...rest}>
        <UIIcon name="facebook f" />
        {children}
      </button>
    )
  } else {
    return (
      <button className={classes} style={{alignItems: "center"}} {...rest}>
        {children}
      </button>
    )
  }
}

export default FMButton
