/* eslint-disable no-unused-vars */
import React, { Component, } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter, } from 'react-router-dom'
import {
  Button as UIButton,
  Container as UIContainer,
  Divider as UIDivider,
  Dropdown as UIDropdown,
  Icon as UIIcon,
  Image as UIImage,
  Menu as UIMenu,
  Segment as UISegment,
} from 'semantic-ui-react'
import { isMobile } from '../lib/responsive'
import { getLogoSvgPath, getDashboardPath, getEditProfilePath, } from '../urls'
import {
  getActivePathname, getUserFirstName, getClientProfile, getCurrentUser,
  isLoggedIn,
} from '../selectors'

import { unsetToken, logoutRequest, } from '../actions'

import SettingsDropdown from '../containers/SettingsDropdown'
import LoginMenu from '../components/LoginMenu'
import Logo from '../components/Logo'


class MenuBar extends Component {
  static propTypes = {
    profile: PropTypes.object,
    pathname: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }

  ////////////////// Lifecycle ///////////////////////
  constructor(props) {
    super(props)
    this.state = {
      showMobileMenu: false,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  //////////////// Event handlers ////////////////////////
  resize = () => this.forceUpdate()

  mobileMenuClick = () => {
    return this.setState({
      showMobileMenu: !this.state.showMobileMenu
    })
  }

  hideMenu = () => {
    this.setState({
      showMobileMenu: false,
    })
  }

  handleMobileMenuItemClick = (pathname) => {
    const { history } = this.props
    this.hideMenu()
    history.push({
      pathname
    })
  }

  handleLogoutClick = () => {
    const { dispatch } = this.props
    console.log("dispatching logout")
    this.hideMenu()
    dispatch(logoutRequest())
  }

  ///////////////////// Subcomponents //////////////////
  renderMobileMenu(isLoggedIn, isChef) {
    return (
      <div>
        <UIMenu inverted stackable
          className='mobile-menu no-border-radius blue-bg'
        >
        {
          isLoggedIn ?
          <div>
            <UIMenu.Item name="Home"
              onClick={() => this.handleMobileMenuItemClick("/")}
            />
            {
              isChef ?
              <UIMenu.Item name="Host a Meal"
                onClick={() => this.handleMobileMenuItemClick("/newMeal")}
              /> :
              <UIMenu.Item name="Become a chef"
                onClick={() => this.handleMobileMenuItemClick("/cook")}
              />
            }
            <UIMenu.Item name="Dasboard "
              onClick={() => this.handleMobileMenuItemClick(getDashboardPath())}
            />
            <UIMenu.Item name="Edit Profile"
              onClick={() => this.handleMobileMenuItemClick(getEditProfilePath())}
            />
            <UIMenu.Item name="Logout"
              onClick={() => this.handleLogoutClick()}
            />
          </div> :
          <div>
            <UIMenu.Item name="Home"
              onClick={() => this.handleMobileMenuItemClick("/")}
            />
            <UIMenu.Item name="Become a Chef"
              onClick={() => this.handleMobileMenuItemClick("/cook")}
            />
            <UIMenu.Item name="Signup"
              onClick={() => this.handleMobileMenuItemClick("/signup")}
            />
            <UIMenu.Item name="Login"
              onClick={() => this.handleMobileMenuItemClick("/login")}
            />
          </div>
        }
        </UIMenu>
      </div>
    )
  }

  render() {
    const { pathname, isLoggedIn, profile, } = this.props
    const { showMobileMenu } = this.state

    const isChef = profile && profile.chef ? true : false

    if (isMobile()) {
      const arrowIcon = showMobileMenu ? 'angle up' : 'angle down'
      return (
        <div className='menu-container'>
          <UIMenu inverted borderless size='large'
            className='top-menu no-border-radius blue-bg menu-vertical'
          >
            <UIContainer>
              <UIMenu.Item onClick={this.mobileMenuClick}>
                <Logo size="30px" text color="#18BC9C" />
                <UIIcon name={arrowIcon}/>
              </UIMenu.Item>
            </UIContainer>
          </UIMenu>
          {
            showMobileMenu ?
            this.renderMobileMenu(isLoggedIn, isChef) :
            <div />
          }
        </div>
      )
    } else {
      return (
        <UIMenu stackable fixed='top' borderless inverted size='large'
          className='blue-bg top-menu menu-vertical'
        >
          <UIMenu.Item position='left'
            as={Link} to="/"
          >
            <Logo text size="30px" color="#18BC9C" />
          </UIMenu.Item>
          {
            isLoggedIn ?
            <SettingsDropdown /> :
            <LoginMenu />
          }
        </UIMenu>
      )
    }
  }
}
            // <div style={{height: "65px",
            //   verticalAlign: "middle",
            //   display: "table-cell"
            // }}>
            //   <Logo height="100%"/>
            // </div>

const mapStateToProps = (state, ownProps) => {
  const user = getCurrentUser(state)
  return {
    profile: getClientProfile(state),
    pathname: getActivePathname(state),
    isLoggedIn: isLoggedIn(state),
  }
}

export default withRouter(connect(mapStateToProps)(MenuBar))
