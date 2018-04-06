/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { PropTypes } from 'prop-types'
import { withRouter, } from 'react-router'
import { connect } from 'react-redux'
import { actions, Control, Errors, Form, } from 'react-redux-form'
import { push } from 'react-router-redux'
import {
  Button as UIButton,
  Form as UIForm,
  Grid as UIGrid,
  Header as UIHeader,
  Message as UIMessage,
  Segment as UISegment,
} from 'semantic-ui-react'

import { getMealById, getUserId, } from '../selectors'
import { getMealPath, } from '../urls'
import {
  isRequired,
  isNumber,
  isPositiveNumber,
  requiredError,
} from '../lib/validators'
import { editMealRequest, deleteMealRequest, } from '../actions/'


class MealEditForm extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    status: PropTypes.object,
    meal: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  handleSubmit = (form) => {
    const { dispatch, id, } = this.props
    dispatch(editMealRequest(id, form))
  }

  handleDeleteButtonClick = () => {
    const { dispatch, meal, } = this.props
    dispatch(deleteMealRequest(meal))
  }

  handleCancelButtonClick = () => {
    const { dispatch, id, } = this.props
    dispatch(push(getMealPath(id)))
  }

  // Lifecycle
  componentDidMount() {
    var rect = ReactDOM.findDOMNode(this)
      .getBoundingClientRect()
    window.scrollTo(0, rect.top - 100)
  }
  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.reset("forms.editMeal"))
    dispatch(actions.resetErrors('forms.editMeal'))
    window.scrollTo(0, 0)
  }

  // Don't use Control.button for the submission! It Causes errors
  render() {
    const {
      requesting,
      successful,
      messages,
      errors,
    } = this.props.status

    // const requiredError = (props) => {
    //   //console.log("REQUIRED ERROR")
    //   //console.log(props)
    //   const { touched, valid, focus } = props.fieldValue
    //   return !focus && touched && !valid
    // }
    // const deliveryOptions = [
    //   { key: 'p', text: 'Pickup', value: 'pickup' },
    //   { key: 'd', text: 'Delivery', value: 'delivery' },
    // ]

    return (

      <UIForm
        success={successful}
        loading={requesting}
        error={errors && errors.length > 0}
        as={Form}
        model="forms.editMeal"
        onSubmit={v => this.handleSubmit(v)}
      >
        <Control.text
          model=".name"
          component={UIForm.Input}
          mapProps={{
            label: "Name",
            // placeholder: "What's your meal called?",
            width: 14,
            error: requiredError,
          }}
        />
        <Control.text
          model=".servings_offered"
          validators={{
            // isRequired,
            // isPositiveNumber,
          }}
          component={UIForm.Input}
          mapProps={{
            label: "Servings",
            placeholder: "2",
            width: 2,
            error: requiredError,
          }}
        />
        <Control.textarea
          model=".description"
          validators={{
            // isRequired,
          }}
          component={UIForm.TextArea}
          mapProps={{
            label: "Description",
            // required: true,
            placeholder: "What are the ingredients? How are they prepared?",
            error: requiredError,
          }}
        />

        <Control.file
          model=".image"
          accept="image/*"
          validators={{
            // isRequired,
          }}
          component={UIForm.Input}
          mapProps={{
            label: "Upload a photo",
            // required: true,
            // error: requiredError,
          }}
        />

        <UIMessage
          success
          header="You've modified the meal!"
          content=""
        />
        <UIMessage
          error
          list={errors}
        />

        <UIGrid >
          <UIGrid.Row>
            <UIGrid.Column width="11">
              <UIForm.Group inline>
                <UIForm.Button
                  type="submit"
                  color="blue"
                  basic
                >
                  Submit
                </UIForm.Button>

                <UIForm.Field>
                  <UIButton color="red" basic
                    onClick={this.handleDeleteButtonClick}
                  >
                    Delete
                  </UIButton>
                </UIForm.Field>
              </UIForm.Group>
            </UIGrid.Column>
            <UIGrid.Column width="5" textAlign='right'>
              <UIForm.Field className='ui right floated'>
                <UIButton basic
                  floated='right'
                  onClick={this.handleCancelButtonClick}
                >
                  Cancel
                </UIButton>
              </UIForm.Field>
            </UIGrid.Column>
          </UIGrid.Row>
        </UIGrid>

      </UIForm>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  const { id } = ownProps.match.params
  return {
    id,
    meal: getMealById(state, id),
    status: state.status.editMeal,
  }
}

export default withRouter(connect(mapStateToProps)(MealEditForm))
