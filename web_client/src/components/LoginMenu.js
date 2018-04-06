/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Menu as UIMenu,
  Segment as UISegment,
  Button as UIButton,
  Rail as UIRail,
  Container as UIContainer,
  Dropdown as UIDropdown,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class NavMenu extends Component {
  // static propTypes = {
  //   clientName: PropTypes.string,
  //   onLogoutClick: PropTypes.func,
  // }


  render() {
    return (
      <UIMenu.Menu position='right'>
        <UIMenu.Item position='right' name="Become a Chef"
          as={Link} to="/cook"
        />
        <UIMenu.Item position='right' name="Login"
          as={Link} to="/login"
        />
        <UIMenu.Item position='right' name="signup"
          as={Link} to="/signup"
        />
      </UIMenu.Menu>
    )
  }
}
