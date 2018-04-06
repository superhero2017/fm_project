/* eslint-disable no-unused-vars */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Divider as UIDivider,
  Form as UIForm,
  Segment as UISegment,
} from 'semantic-ui-react'

import {
  getClientProfile,
  getCurrentUserId,
} from '../selectors'

import EditProfileRequiredSection from '../components/EditProfileRequiredSection'
import EditProfileOptionalSection from '../components/EditProfileOptionalSection'

const PersonalDataSection = ({ form, profile, }) => {
  return (
    <UIForm.Field>
      <EditProfileRequiredSection
        form={form}
        {...profile}
      />
      <EditProfileOptionalSection
        {...profile}
      />
    </UIForm.Field>
  )
}

PersonalDataSection.PropTypes = {
  form: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    form: state.forms.forms.editProfile,
    profile: getClientProfile(state),
  }
}

export default connect(mapStateToProps)(PersonalDataSection)
