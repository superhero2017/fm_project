/* eslint-disable no-unused-vars */
import React, { Component, } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter, } from 'react-router-dom'
import {
  Image as UIImage,
  Label as UILabel,
  Menu as UIMenu,
  Dropdown as UIDropdown,
} from 'semantic-ui-react'
import { getUserFirstName, getClientProfile, } from '../selectors'
import { getDefaultProfilePhoto, getDashboardPath, getEditProfilePath, } from '../urls'
import { logoutRequest, } from '../actions'


class SettingsDropdown extends Component {
  static propTypes = {
    profile: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  handleLogoutClick = () => {
    const { dispatch } = this.props
    console.log("dispatching logout")
    dispatch(logoutRequest())
  }

  // TODO: load the profile with the menu bar as soon as auth is confirmed
  renderAvatar = () => {
    const { profile } = this.props
    const imageProps = {
      src: profile && profile.image ? profile.image : getDefaultProfilePhoto(),
      avatar: true,
    }


    return (
      <UIImage {...imageProps}/>
    )
  }

  render() {

    const { profile } = this.props
    const isChef = profile && profile.chef ? true : false

    return (
      <UIMenu.Menu position='right'>
        {
          isChef ?
          <UIMenu.Item position='right' name="Host a Meal"
            as={Link} to="/newMeal"
          /> :
          <UIMenu.Item position='right' name="Become a Chef"
            as={Link} to="/cook"
          />
        }
        <UIDropdown icon={{}} item trigger={this.renderAvatar()}>
          <UIDropdown.Menu>
            <UIDropdown.Item as={Link} to={getDashboardPath()}>
              Dashboard
            </UIDropdown.Item>
            <UIDropdown.Divider />
            <UIDropdown.Item as={Link} to={getEditProfilePath()}>
              Edit Profile
            </UIDropdown.Item>
            <UIDropdown.Divider />
            <UIDropdown.Item onClick={this.handleLogoutClick}>
              Logout
            </UIDropdown.Item>
          </UIDropdown.Menu>
        </UIDropdown>
      </UIMenu.Menu>
    )
  }
}


const mapStateToProps = (state, ownProps) => {

  return {
    profile: getClientProfile(state),
  }
}

export default connect(mapStateToProps)(SettingsDropdown)
// export default MenuBar
