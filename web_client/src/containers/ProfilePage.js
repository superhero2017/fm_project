/* eslint-disable no-unused-vars */
import React, { Component, } from 'react'
import PropTypes from 'prop-types'
import { Link, Route, Switch, } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Button as UIButton,
  Menu as UIMenu,
  Container as UIContainer,
  Grid as UIGrid,
  Image as UIImage,
  Header as UIHeader,
  Divider as UIDivider,
} from 'semantic-ui-react'

import {
  getCurrentUser,
  getActivePathname,
  getClientProfile,
} from '../selectors'
import {
  getProfilePath,
  getEditProfilePath,
  getEditProfilePhotosPath,
  getEditVerificationPath,
} from '../urls'

import {
  clientProfileRequest,
} from '../actions/'

import EditProfileSideMenu from '../components/EditProfileSideMenu'
import ProfilePhotosForm from '../components/PhotosSection'

import EditProfileForm from '../containers/EditProfileForm'
import TrustVerificationForm from '../containers/forms/TrustVerificationForm'



class ProfilePage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    profile: PropTypes.object,
    pathname: PropTypes.string.isRequired,
    clientProfileRequest: PropTypes.func.isRequired,
  }

  // Check if the profile is loaded; if not, load it
  componentDidMount() {
    // console.log("will this be an infinite loop?")
    const {
      profile,
      clientProfileRequest,
    } = this.props
    if (!profile) {
      clientProfileRequest()
    }
  }

  render() {
    const { user, pathname, } = this.props
    console.log(user);
    return (
      <div>
        <UIGrid>
          <UIGrid.Column width="4">
            <EditProfileSideMenu userId={user.pk} />
          </UIGrid.Column>
          <UIGrid.Column width="12">
            <EditProfileForm />
{/*
            <Switch>
              <Route
                exact
                path="/user/profile/trust"
                component={TrustVerificationForm}
              />
              <Route
                path="/user/profile"
                component={EditProfileForm}
              />
            </Switch>
*/}
          </UIGrid.Column>
        </UIGrid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: getCurrentUser(state),
    pathname: getActivePathname(state),
    profile: getClientProfile(state),
  }
}

export default connect(mapStateToProps, {
  clientProfileRequest
})(ProfilePage)
