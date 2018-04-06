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
  Container
} from 'reactstrap';

import { colors } from '../../style-constants'

const FMContainer = ({
  padding,
  children,
}) => {
  return (
    <Container >
      {children}
    </Container>
  )

}

export default FMContainer
