/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { withRouter, } from 'react-router'
import { connect } from 'react-redux'
import { Control, Form, actions, } from 'react-redux-form'
import {
  Button as UIButton,
  Form as UIForm,
  Table as UITable,
  Input as UIInput,
  Header as UIHeader,
  Message as UIMessage,
  Segment as UISegment,
} from 'semantic-ui-react'
import moment from 'moment'

import {
  getClientProfile,
  getCurrentUserId,
} from '../../selectors'
import {
  isRequired,
  isNumber,
  isPositiveNumber,
  requiredError,
} from '../../lib/validators'
import {
  editProfileRequest,
  setInitialEditProfileStatus,
  resetEditProfileForm,
} from '../../actions/'

import EditProfileRequiredSection from '../../components/EditProfileRequiredSection'
import EditProfileOptionalSection from '../../components/EditProfileOptionalSection'

class TrustVerificationForm extends Component {
  render() {
    return (
      <div>
        Upload identifying information.
        This is optional, but recommended if you are only an eater
      </div>
    )
  }
  // static propTypes = {
  //   id: PropTypes.string.isRequired,
  //   profile: PropTypes.object,
  //   form: PropTypes.object,
  //   formValues: PropTypes.object.isRequired,
  //   status: PropTypes.object.isRequired,
  //   editProfileRequest: PropTypes.func.isRequired,
  //   setInitialEditProfileStatus: PropTypes.func.isRequired,
  //   resetEditProfileForm: PropTypes.func.isRequired,
  //   load: PropTypes.func.isRequired,
  //   resetValidity: PropTypes.func.isRequired,
  // }
  //
  // // Lifecycle Methods
  // constructor(props) {
  //   super(props)
  //   this.initialFormValues = {}
  // }
  //
  // componentDidMount() {
  //   if (this.props.profile) {
  //     this.initializeForm(this.props.profile)
  //   }
  // }
  //
  // componentWillUpdate(nextProps) {
  //   if (!this.props.profile && nextProps.profile) {
  //     this.initializeForm(nextProps.profile)
  //   }
  // }
  //
  // componentWillUnmount() {
  //   this.props.resetEditProfileForm()
  // }
  //
  // // Custom methods
  // initializeForm(profile) {
  //   const {
  //     load,
  //     setInitialEditProfileStatus,
  //     resetValidity,
  //   } = this.props
  //   var dob = moment(profile.dob, "YYYY-MM-DD")
  //   const valid = dob.isValid()
  //   var formValues = {
  //     ...profile,
  //     dob_year: valid ? dob.year().toString() : "",
  //     dob_month: valid ? dob.month().toString() : "",
  //     dob_date: valid ? dob.date().toString() : "",
  //   }
  //   console.log(formValues);
  //   load('forms.editProfile', formValues)
  //   setInitialEditProfileStatus()
  //   resetValidity('forms.editProfile')
  //   this.initialFormValues = formValues
  // }
  //
  // handleSubmit = (values) => {
  //   const { editProfileRequest, id, } = this.props
  //   const dob = moment()
  //     .year(values.dob_year)
  //     .month(values.dob_month)
  //     .date(values.dob_date)
  //     .format("YYYY-MM-DD")
  //   const form = {
  //     ...values,
  //     dob,
  //   }
  //   editProfileRequest(id, form)
  // }
  //
  // render() {
  //   const { profile, form, formValues, } = this.props
  //   const {
  //     requesting,
  //     successful,
  //     messages,
  //     errors,
  //   } = this.props.status
  //   const disabled =
  //     JSON.stringify(this.initialFormValues)
  //     === JSON.stringify(formValues)
  //
  //   return (
  //     <UIForm
  //       success={successful}
  //       loading={requesting}
  //       error={errors && errors.length > 0}
  //       warning={!successful && form.$form.submitFailed}
  //       as={Form}
  //       model="forms.editProfile"
  //       onSubmit={v => this.handleSubmit(v)}
  //     >
  //       <EditProfileRequiredSection
  //         form={form}
  //         {...profile}
  //       />
  //       <EditProfileOptionalSection
  //         {...profile}
  //       />
  //       <UIMessage
  //         success
  //         header="Changes Saved!"
  //         content=""
  //       />
  //       <UIMessage
  //         warning
  //         header="Oops, there are some values missing!"
  //       />
  //       <UIMessage
  //         error
  //         header="There were problems"
  //         list={errors}
  //       />
  //       <UIForm.Button
  //         type="submit"
  //         color="blue"
  //         disabled={disabled}
  //       >
  //         Save
  //       </UIForm.Button>
  //     </UIForm>
  //   )
  // }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // id: getCurrentUserId(state).toString(),
    // profile: getClientProfile(state),
    // form: state.forms.forms.editProfile,
    // formValues: state.forms.editProfile,
    // status: state.status.editProfile
  }
}

export default connect(mapStateToProps)(TrustVerificationForm)
