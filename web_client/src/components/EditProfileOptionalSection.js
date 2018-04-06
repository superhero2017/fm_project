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
  requiredError,
} from '../lib/validators'

const EditProfileOptionalSection = ({ school, work, }) => {
  const year = moment().get('year')
  const schoo = "yallll"
  // const { pathname } = location
  return (
    <UITable celled>
      <UITable.Header>
        <UITable.Row>
          <UITable.HeaderCell>
            Optional
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
                    School
                  </UILabel>
                </UIGrid.Column>
                <UIGrid.Column width="12">
                  <Control.text
                    model=".school"
                    component={UIForm.Input}
                    mapProps={{
                      placeholder: "High School, college, or grad school",
                      // width: 14,
                      // error: requiredError,
                    }}
                  />
                </UIGrid.Column>
              </UIGrid.Row>
              <UIGrid.Row>
                <UIGrid.Column width="4"
                  verticalAlign="top" textAlign="right"
                >
                  <UILabel basic pointing="right">
                    Work
                  </UILabel>
                </UIGrid.Column>
                <UIGrid.Column width="12">
                  <UIForm.Field>
                    <Control.text
                      model=".workplace"
                      validators={{
                        // isRequired,
                      }}
                      component={UIForm.Input}
                      mapProps={{
                        placeholder: "Job title and / or company",
                        error: requiredError,
                      }}
                    />
                  </UIForm.Field>
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

export default EditProfileOptionalSection
