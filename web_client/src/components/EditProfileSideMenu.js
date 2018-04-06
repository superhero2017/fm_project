/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter, } from 'react-router-dom'
import {
  Button as UIButton,
  Container as UIContainer,
  Grid as UIGrid,
  Menu as UIMenu,
  Image as UIImage,
  Header as UIHeader,
  Divider as UIDivider,
  Dropdown as UIDropdown,
  Segment as UISegment,
  List as UIList,
  Icon as UIIcon,
} from 'semantic-ui-react'

import {
  getProfilePath,
  getEditProfilePath,
  getEditProfilePhotosPath,
  getEditVerificationPath,
} from '../urls'

const EditProfileSideMenu = ({ userId, location}) => {

  const { pathname } = location
  return (
      <UIMenu secondary vertical fluid size="large">
        <UIMenu.Item
          active={pathname === getEditProfilePath()}
          as={Link}
          to={getEditProfilePath()}
        >
          {"Personal Data"}
        </UIMenu.Item>
        <UIMenu.Item
          active={pathname === getEditProfilePhotosPath()}
          as={Link}
          to={getEditProfilePhotosPath()}
        >
          {"Photos"}
        </UIMenu.Item>
        <UIMenu.Item
          active={pathname === getEditVerificationPath()}
          as={Link}
          to={getEditVerificationPath()}
        >
          {"Trust and Verification"}
        </UIMenu.Item>
        <br />
        <UIButton basic fluid
          as={Link}
          to={getProfilePath(userId)}
        >
          {"View Profile"}
        </UIButton>
      </UIMenu>
  )
}

EditProfileSideMenu.propTypes = {
  userId: PropTypes.number.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired
  // also uses router props
  // routerProps: PropTypes.object,
}

export default withRouter(EditProfileSideMenu)
