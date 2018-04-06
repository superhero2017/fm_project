/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Link, Route, Switch, } from 'react-router-dom'
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
} from '../selectors'
import {
  isRequired,
  isNumber,
  isPositiveNumber,
  requiredError,
} from '../lib/validators'
import {
  editProfileRequest,
  setInitialEditProfileStatus,
  resetEditProfileForm,
  initEditProfileForm,
} from '../actions/'

import PersonalDataSection from '../components/PersonalDataSection'
import PhotosSection from '../components/PhotosSection'

class EditProfileForm extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    profile: PropTypes.object,
    form: PropTypes.object,
    formValues: PropTypes.object.isRequired,
    status: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  // Lifecycle Methods
  constructor(props) {
    super(props)
    this.initialFormValues = {}
  }

  componentDidMount() {
    if (this.props.profile) {
      this.initializeForm(this.props.profile)
    }
  }

  componentWillUpdate(nextProps) {
    if (!this.props.profile && nextProps.profile) {
      this.initializeForm(nextProps.profile)
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(resetEditProfileForm())
  }

  // Custom methods
  // Gets the initial values from current profile object,
  // And passes them to RRF to load into the form model
  // Also sends an action to initialize the form status
  initializeForm(profile) {
    const { dispatch } = this.props
    var dob = moment(profile.dob, "YYYY-MM-DD")
    const valid = dob.isValid()
    var formValues = {
      ...profile,
      dob_year: valid ? dob.year().toString() : "",
      dob_month: valid ? dob.month().toString() : "",
      dob_date: valid ? dob.date().toString() : "",
      image: null, // don't want the profile pic url to be the form value
    }
    console.log(formValues);
    dispatch(actions.load('forms.editProfile', formValues))
    dispatch(initEditProfileForm())
    dispatch(actions.resetValidity('forms.editProfile'))
    this.initialFormValues = formValues
  }

  // TODO: only submit the values that have been changed
  handleSubmit = (values) => {
    const { id, dispatch, } = this.props
    // send the updated image (if any)
    const dob = moment()
      .year(values.dob_year)
      .month(values.dob_month)
      .date(values.dob_date)
      .format("YYYY-MM-DD")
    const form = {
      ...values,
      dob,
      image: values.image ? values.image[0] : null
    }
    console.log(this.initialFormValues.image)
    console.log(values.image)
    dispatch(editProfileRequest(id, form))
  }

  render() {
    const { profile, form, formValues, } = this.props
    const {
      requesting,
      successful,
      messages,
      errors,
    } = this.props.status
    const disabled =
      JSON.stringify(this.initialFormValues)
      === JSON.stringify(formValues)

    return (
      <UIForm
        success={successful}
        loading={requesting}
        error={errors && errors.length > 0}
        warning={!successful && form.$form.submitFailed}
        as={Form}
        model="forms.editProfile"
        onSubmit={v => this.handleSubmit(v)}
      >
        <Switch>
          <Route
            exact
            path="/user/profile/photos"
            component={PhotosSection}
          />
          <Route
            exact
            path="/user/profile"
            component={PersonalDataSection}
          />
        </Switch>

        <UIMessage
          success
          header="Changes Saved!"
          content=""
        />
        <UIMessage
          warning
          header="Oops, there are some values missing!"
        />
        <UIMessage
          error
          header="There were problems"
          list={errors}
        />
        <UIForm.Group inline>
          <UIForm.Button
            type="submit"
            color="blue"
            disabled={disabled}
          >
            Save
          </UIForm.Button>
        </UIForm.Group>
      </UIForm>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: getCurrentUserId(state).toString(),
    profile: getClientProfile(state),
    form: state.forms.forms.editProfile,
    formValues: state.forms.editProfile,
    status: state.status.editProfile
  }
}

export default connect(mapStateToProps)(EditProfileForm)
