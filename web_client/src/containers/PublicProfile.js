/* eslint-disable no-unused-vars */
import React, { Component, } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Button as UIButton,
  Container as UIContainer,
  Grid as UIGrid,
  Image as UIImage,
  Header as UIHeader,
  Divider as UIDivider,
  Loader as UILoader,
} from 'semantic-ui-react'

import { getDefaultImage, getProfilePath,} from '../urls'
import { getProfileById, } from '../selectors'
import { profileRequest, } from '../actions/'

class PublicProfile extends Component {
  static propTypes = {
    profile: PropTypes.object,
    id: PropTypes.string.isRequired,
    status: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  // Check if the profile is loaded; if not, load it
  componentDidMount() {
    console.log("will this be an infinite loop?")
    const { id, profile, dispatch, } = this.props
    if (!profile) {
      dispatch(profileRequest(id))
    }
  }

  render() {
    const { profile, status, } = this.props
    const img = profile && profile.image ? profile.image : getDefaultImage()

    if (profile) {
      return (
        <div>
          <UIHeader as='h1'>
            {"Hi, I'm" + profile.first_name}
          </UIHeader>
          <UIImage src={img} />
        </div>
      )
    } else {
      return (
        <div>
        {status.requesting ?
          <UILoader active>Loading Profile</UILoader> :
          <span>404</span>
        }
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps)
  const { id } = ownProps.match.params
  const profile = getProfileById(state, id)
  console.log(profile)
  const { status } = state.profiles

  return {
    profile,
    status,
    id,
  }
}

export default connect(mapStateToProps)(PublicProfile)
