/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { withRouter, } from 'react-router'
import { connect } from 'react-redux'
import { Control, Form, actions, } from 'react-redux-form'
import {
  Button as UIButton,
  Container as UIContainer,
  Form as UIForm,
  Grid as UIGrid,
  Header as UIHeader,
  Image as UIImage,
  Input as UIInput,
  Message as UIMessage,
  Segment as UISegment,
  Table as UITable,
} from 'semantic-ui-react'
import moment from 'moment'

import {
  isRequired,
  isNumber,
  isPositiveNumber,
  requiredError,
} from '../lib/validators'
import {
  getClientProfile,
  getCurrentUserId,
} from '../selectors'
import { getDefaultProfilePhoto, getProfilePath,} from '../urls'

import {
  editProfileRequest,
  setInitialEditProfileStatus,
  resetEditProfileForm,
} from '../actions/'

const PhotosSection = ({ form, profile, }) => {
  const img = profile && profile.image ? profile.image : getDefaultProfilePhoto()

  return (
    <UIForm.Field>
      <UITable celled>
        <UITable.Header>
          <UITable.Row>
            <UITable.HeaderCell>
              Profile Picture
            </UITable.HeaderCell>
          </UITable.Row>
        </UITable.Header>
        <UITable.Body>
          <UITable.Row>
            <UITable.Cell>
              <UIGrid stackable columns='equal'>
                <UIGrid.Row>
                  <UIGrid.Column>

                    <UIImage src={img} size="medium"/>
                  </UIGrid.Column>
                  <UIGrid.Column>
                    <UIForm.Field>
                      <UIHeader sub>
                        {"Main Photo"}
                      </UIHeader>
                      <Control.file
                        model=".image"
                        accept="image/*"
                        validators={{
                          // isRequired,
                        }}
                        component={UIForm.Input}
                        mapProps={{
                          // required: true,
                          // error: requiredError,
                        }}
                      />
                      <UIContainer fluid>
                        {"Upload an image to use as your profile photo. \
                        This is highly encouraged as other users \
                        will tend to trust you more \
                        when they can see what you look like."}
                      </UIContainer>
                      <br />
                      <UIContainer fluid>
                        {"This will appear wherever your profile is mentioned-- on meals you cook, reviews you leave, etc. "}
                      </UIContainer>
                    </UIForm.Field>
                  </UIGrid.Column>
                </UIGrid.Row>
              </UIGrid>
            </UITable.Cell>
          </UITable.Row>
        </UITable.Body>
      </UITable>
    </UIForm.Field>
  )
}

PhotosSection.PropTypes = {
  form: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    form: state.forms.forms.editProfile,
    profile: getClientProfile(state),
  }
}

export default connect(mapStateToProps)(PhotosSection)
