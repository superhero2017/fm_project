/* eslint-disable no-unused-vars */
import React, { Component, } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter, } from 'react-router-dom'
import {
  Menu as UIMenu,
  Segment as UISegment,
  Divider as UIDivider,
  Image as UIImage,
  Container as UIContainer,
  Button as UIButton,
  Dropdown as UIDropdown,
} from 'semantic-ui-react'
import { getActivePathname, } from '../selectors'
import {
  getLogoSvgPath,
  getDashboardPath,
  getEditProfilePath,
  pathIsDescendant,
} from '../urls'
import { getCurrentUser, isLoggedIn, } from '../selectors'
import { unsetToken } from '../actions'


class ControlPanelMenu extends Component {

  render() {
    const { pathname, } = this.props.location
    console.log(this.props)
    // console.log(path)

    return (
      <UIContainer>
        <UIMenu stackable pointing secondary size="large" className='cpanel-menu'>
          <UIMenu.Item name="Dashboard"
            active={pathname === getDashboardPath()}
            as={Link}
            to={getDashboardPath()}
          />
          <UIMenu.Item
            active={pathname === "/user/cooking"}
            as={Link}
            to="/user/cooking"
          >
            {"Meals You're Cooking"}
          </UIMenu.Item>
          <UIMenu.Item
            active={pathname === "/user/eating"}
            as={Link}
            to="/user/eating"
          >
            {"Meals You're Eating"}
          </UIMenu.Item>
          <UIMenu.Item name={"Reviews"}
            active={pathname === "/user/reviews"}
            as={Link}
            to="/user/reviews"
          />
          <UIMenu.Item name={"Edit Profile"}
            active={pathIsDescendant(pathname, getEditProfilePath())}
            as={Link}
            to={getEditProfilePath()}
          />
          <UIMenu.Item name={"Account"}
            active={pathname === "/user/account"}
            as={Link}
            to="/user/account"
          />
        </UIMenu>
        <UIDivider hidden />
      </UIContainer>
    )
  }
}

export default withRouter(ControlPanelMenu)
