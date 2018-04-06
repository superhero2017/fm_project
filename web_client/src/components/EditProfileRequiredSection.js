/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter, } from 'react-router-dom'
import { Control, } from 'react-redux-form'
import {
  Button as UIButton,
  Container as UIContainer,
  Divider as UIDivider,
  Dropdown as UIDropdown,
  Form as UIForm,
  Grid as UIGrid,
  Header as UIHeader,
  Icon as UIIcon,
  Image as UIImage,
  Input as UIInput,
  Label as UILabel,
  List as UIList,
  Menu as UIMenu,
  Message as UIMessage,
  Segment as UISegment,
  Table as UITable,
} from 'semantic-ui-react'
import ReactPhoneInput from 'react-phone-input'
import moment from 'moment'

import {
  getProfilePath,
  getEditProfilePath,
  getEditVerificationPath,
} from '../urls'

import {
  isRequired,
  isNumber,
  isPositiveNumber,
  isPhoneNumber,
  requiredError,
  modelError,
} from '../lib/validators'

import DateOfBirthFormGroup from '../components/DateOfBirthFormGroup'
import FMDropdown from '../components/FMDropdown'

const EditProfileRequiredSection = ({
  profile,
  form,
}) => {

    const genderOptions = [
      {
        text: "Male",
        value: "male",
      },
      {
        text: "Female",
        value: "female",
      },
    ]

  // const { pathname } = location
  return (
    <UITable celled>
      <UITable.Header>
        <UITable.Row>
          <UITable.HeaderCell>
            Required
          </UITable.HeaderCell>
        </UITable.Row>
      </UITable.Header>
      <UITable.Body>
        <UITable.Row>
          <UITable.Cell>
            <UIGrid>
              <UIGrid.Row>
                <UIGrid.Column width="4"
                  verticalAlign="top" textAlign="right"
                >
                  <UILabel basic pointing="right">
                    First Name
                  </UILabel>
                </UIGrid.Column>
                <UIGrid.Column width="12">
                  <Control.text
                    model=".first_name"
                    component={UIInput}
                    mapProps={{
                      fluid: true,
                      // width: 14,
                      error: requiredError,
                    }}
                  />
                </UIGrid.Column>
              </UIGrid.Row>
              <UIGrid.Row>
                <UIGrid.Column width="4"
                  verticalAlign="top" textAlign="right"
                >
                  <UILabel basic pointing="right">
                    {"Last Name"}
                  </UILabel>
                </UIGrid.Column>
                <UIGrid.Column width="12">
                  <UIForm.Field>
                    <Control.text
                      model=".last_name"
                      validators={{
                        // isRequired,
                      }}
                      component={UIInput}
                      mapProps={{
                        fluid: true,
                        error: requiredError,
                      }}
                    />
                  </UIForm.Field>
                  <UIContainer fluid>
                    {"We'll only show your last name to other users with whom you have transactions."}
                  </UIContainer>
                </UIGrid.Column>
              </UIGrid.Row>
              <UIGrid.Row>
                <UIGrid.Column width="4"
                  verticalAlign="top" textAlign="right"
                >
                  <UILabel basic pointing="right">
                    Phone
                  </UILabel>
                </UIGrid.Column>
                <UIGrid.Column width="12">
                  <UIForm.Field>
                    <Control.text
                      model=".phone"
                      validators={{
                        // isRequired,
                        isPhoneNumber,
                      }}
                      component={ReactPhoneInput}
                      mapProps={{
                        defaultCountry: 'us',
                        onlyCountries: ['us']
                      }}
                    />
                  </UIForm.Field>
                  <UIContainer fluid>
                    {"Your phone number will be used \
                    for contacting users with whom you have\
                    an ongoing transaction."}
                  </UIContainer>
                </UIGrid.Column>
              </UIGrid.Row>

              <UIGrid.Row>
                <UIGrid.Column width="4"
                  verticalAlign="top" textAlign="right"
                >
                  <UILabel basic pointing="right">
                    {"Gender"}
                  </UILabel>
                </UIGrid.Column>
                <UIGrid.Column width="12">
                  <UIForm.Field
                    error={modelError(form.gender)}
                  >
                    <FMDropdown
                      model=".gender"
                      placeholder="Gender"
                      options={genderOptions}
                      validators={{
                        isRequired,
                      }}
                    />
                  </UIForm.Field>
                  <UIContainer fluid>
                    {"This is just for our records; we won't show it to anyone"}
                  </UIContainer>
                </UIGrid.Column>
              </UIGrid.Row>
              <UIGrid.Row>
                <UIGrid.Column width="4"
                  verticalAlign="top" textAlign="right"
                >
                  <UILabel basic pointing="right">
                    {"About You"}
                  </UILabel>
                </UIGrid.Column>
                <UIGrid.Column width="12">
                  <Control.textarea
                    model=".bio"
                    validators={{
                      isRequired,
                    }}
                    component={UIForm.TextArea}
                    mapProps={{
                      // required: true,
                      placeholder: "What types of food do you love? What do you cook?",
                      error: modelError(form.bio),
                      }}
                    />
                  <UIContainer fluid>
                    {"Community is a big part of the Feedme experience, so take time to write a little about yourself. Your eating habits, philosophy of food (or of anything else), and your favorite color are all fair game here."}
                  </UIContainer>
                </UIGrid.Column>
              </UIGrid.Row>
              <UIGrid.Row>
                <UIGrid.Column width="4"
                  verticalAlign="top" textAlign="right"
                >
                  <UILabel basic pointing="right">
                    {"Date of Birth"}
                  </UILabel>
                </UIGrid.Column>
                <UIGrid.Column width="12">
                  <DateOfBirthFormGroup form={form} />
                  <UIContainer fluid>
                    {"We collect this for legal purposes only and won't share it with other users."}
                  </UIContainer>
                </UIGrid.Column>
              </UIGrid.Row>
              <UIGrid.Row>
                <UIGrid.Column width="4"
                  verticalAlign="top" textAlign="right"
                >
                  <UILabel basic pointing="right">
                    {"Where you live"}
                  </UILabel>
                </UIGrid.Column>
                <UIGrid.Column width="12">
                  <Control.text
                    model=".town"
                    validators={{
                      isRequired,
                    }}
                    component={UIForm.Input}
                    mapProps={{
                      placeholder: "e.g. New Haven, CT / New York, NY / etc.",
                      error: modelError(form.town),
                    }}
                  />
                </UIGrid.Column>
              </UIGrid.Row>
            </UIGrid>
          </UITable.Cell>
        </UITable.Row>
      </UITable.Body>
    </UITable>
  )
}

// EditProfileSideMenu.propTypes = {
//   userId: PropTypes.number.isRequired,
//   location: PropTypes.shape({
//     pathname: PropTypes.string.isRequired,
//   }).isRequired
//   // also uses router props
//   // routerProps: PropTypes.object,
// }

export default EditProfileRequiredSection
