/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Control, Form, Errors, actions, } from 'react-redux-form'
import {
  Button as UIButton,
  Container as UIContainer,
  Form as UIForm,
  Grid as UIGrid,
  Header as UIHeader,
  Icon as UIIcon,
  Input as UIInput,
  Label as UILabel,
  Message as UIMessage,
  Step as UIStep,
} from 'semantic-ui-react'

import {
  isRequired,
  isNumber,
  isPositiveNumber,
  requiredError,
  modelError,
} from '../lib/validators'
import { getFormattedPrice, } from '../lib/format'
import { getMealPath, } from '../urls'
import {
  newMealRequest,
  resetNewMealForm,
} from '../actions/'

var classNames = require('classnames');


class NewMealForm extends Component {
  static propTypes = {
    newMealId: PropTypes.number,
    status: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  // If the submission was successful, clear the form
  // and then redirect to the new meal page
  componentWillUpdate(nextProps) {
    const { successful } = nextProps.status
    const { dispatch, status, } = this.props
    // console.log(successful);
    if (successful && !status.successful) {
      // console.log(nextProps)
      // console.log("redirecting after meal creation")
      dispatch(actions.reset('forms.newMeal'))
      dispatch(push(getMealPath(nextProps.newMealId)))
    }
  }

  componentWillUnmount() {
    const { dispatch, } = this.props
    dispatch(actions.reset("forms.newMeal"))
  }

  handleSubmit = (values) => {
    const { dispatch, } = this.props
    // console.log("FORM HANDLESUBMIT")
    // console.log(meal)
    const meal = {
      ...values,
      image: values.image ? values.image[0] : null
    }
    dispatch(newMealRequest(meal))
  }

  handleReset = () => {
    const { dispatch, } = this.props
    dispatch(actions.reset('forms.newMeal'))
    dispatch(actions.resetErrors('forms.newMeal'))
  }

  render() {
    const { dispatch, form, } = this.props
    const {
      requesting,
      successful,
      messages,
      errors,
    } = this.props.status

    const warning  = (form.name && !form.name.valid && form.name.touched) ||
      (form.description && !form.description.valid && form.description.touched) ||
      (form.image && !form.image.valid && form.image.touched)

    // This is not working
    const resetEnabled = form.initialValue !== form.value


    // this will always be in error so can't really use it to display error msgs??
    // const isRequired = (val) => val && val.length > 0
    const requiredError = (props) => {
      // console.log("REQUIRED ERROR")
      // console.log(props)
      const { submitFailed, retouched, focus, touched, valid, validated, } = props.fieldValue
      return (submitFailed && !retouched && !focus) ||
      (!focus && touched && (!valid && !validated))
    }


    // Can't mapProps to the UIForm, so use class names
    const formClasses = classNames(
      requesting ? "loading" : false,
      successful ? "success " : false,
      errors.length ? "error " : false,
      warning ? "warning " : false,
    )
    // const formClasses=""
    // console.log(formClasses)

    console.log(form)

        // onSubmitFailed={(form) => this.handleSubmitFailed(form)}
    return (
      <UIForm
        success={successful}
        loading={requesting}
        error={errors && errors.length > 0}
        warning={!successful && form.$form.submitFailed}
        as={Form}
        model="forms.newMeal"
        onSubmit={v => this.handleSubmit(v)}
      >
        <UIForm.Field
          error={modelError(form.name)}
        >
          <UIHeader sub>
            Meal Name
          </UIHeader>
          <Control.text
            model=".name"
            validators={{
              isRequired,
            }}
            component={UIInput}
            mapProps={{
              // required: true,
              placeholder: "What's your meal called?",
              width: 14,
            }}
          />
        </UIForm.Field>
        <UIForm.Field>
          <UIContainer fluid>
            {"Name your meal and try to be as descriptive as possible. \
            Make it sound enticing!"}
          </UIContainer>
        </UIForm.Field>
        <br />

        <UIForm.Field>
          <UIHeader sub>
            {"Description"}
          </UIHeader>
          <Control.textarea
            model=".description"
            validators={{
              isRequired,
            }}
            component={UIForm.TextArea}
            mapProps={{
              // required: true,
              placeholder: "What are the ingredients? How are they prepared?",
              error: modelError(form.description),
            }}
          />
        </UIForm.Field>
        <UIForm.Field>
          <UIContainer fluid>
            {"Provide as much detail as possible \
            about the meal and how you prepare it.\
            Does it cater to a certain diet? \
            Is it an old family recipe? \
            What's great about your meal? "}
          </UIContainer>
          <br />
          <UIContainer fluid>
            {"Try to be completely honest, \
            and your enthusiasm will sell it for you."}
          </UIContainer>
        </UIForm.Field>
        <br />

        <UIForm.Field>
          <UIHeader sub>
            {"Ingredients"}
          </UIHeader>
          <Control.textarea
            model=".ingredients"
            validators={{
              isRequired,
            }}
            component={UIForm.TextArea}
            mapProps={{
              // required: true,
              placeholder: "Olive oil, organic avocado....",
              error: modelError(form.ingredients),
            }}
          />
          <UIContainer fluid>
            {"List all of the ingredients you used to prepare your meal, \
            from the type of cooking oil used to any spices."}
          </UIContainer>
          <br />
          <UIContainer fluid>
            {"Try to be as specific as possible \
            and list brand names or sources where possible, \
            e.g. \"Organic olive oil\", \
            \"Bob's Red Mill Whole Wheat Flour\", etc. "}
          </UIContainer>
        </UIForm.Field>
        <br />

        <UIForm.Field>
          <UIHeader sub>
            Serving Description
          </UIHeader>
          <Control.textarea
            model=".serving_description"
            validators={{
              isRequired,
            }}
            component={UIForm.TextArea}
            mapProps={{
              // required: true,
              placeholder: "One serving is three meatballs with a cup of pasta....",
              error: modelError(form.ingredients),
            }}
          />
        </UIForm.Field>
        <UIForm.Field>
          <UIContainer fluid>
            {"Please describe what a serving of your meal looks like \
            Include as much information as possible, \
            such as the weight, volume, \
            calories (if available), \
            and anything else that you will include \
            with one portion of your meal."}
          </UIContainer>
        </UIForm.Field>
        <br />

        <UIForm.Field>
          <UIGrid>
            <UIGrid.Row>
              <UIGrid.Column width="8">

                <UIForm.Field
                  error={modelError(form.servings_offered)}
                >
                  <UIHeader sub>
                    {"Number of Servings"}
                  </UIHeader>
                  <Control.text
                    model=".servings_offered"
                    validators={{
                      isRequired,
                      isPositiveNumber,
                    }}
                    component={UIInput}
                    mapProps={{
                      placeholder: "2",
                      width: 2,
                    }}
                  />
                </UIForm.Field>

              </UIGrid.Column>
              <UIGrid.Column width="8">

                <UIForm.Field
                  error={false}
                >
                  <UIHeader sub>
                    {"Servings per customer"}
                  </UIHeader>
                  <Control.text
                    model=".min_servings"
                    validators={{
                      isRequired,
                      isPositiveNumber,
                    }}
                    component={UIInput}
                    mapProps={{
                      placeholder: "1",
                      width: 2,
                    }}
                  />
                </UIForm.Field>

              </UIGrid.Column>
            </UIGrid.Row>
            <UIGrid.Row>
              <UIGrid.Column>
                <UIContainer fluid>
                  {"Enter how many servings you're prepared to make \
                  and the minimum number you want to sell to one customer."}
                </UIContainer>
                <br />
                <UIContainer fluid>
                  {"Other users will sign up for servings of your meal \
                  greater than or equal to the minimum you enter.\
                  Once all of them are claimed we will stop displaying your meal."}
                </UIContainer>
              </UIGrid.Column>
            </UIGrid.Row>
          </UIGrid>
        </UIForm.Field>

        <UIForm.Field>
          <UIGrid>
            <UIGrid.Row>
              <UIGrid.Column textAlign='center'>
                <UIHeader sub>
                  {"Price per serving"}
                </UIHeader>
                <UIStep.Group>
                  <UIStep>
                    <UIStep.Content>
                      <UIForm.Field
                        error={false}
                      >
                        <Control.text
                          model=".price"
                          validators={{
                            isRequired,
                            isPositiveNumber,
                          }}
                          component={UIInput}
                          mapProps={{
                            placeholder: "10",
                          }}
                        />
                      </UIForm.Field>
                    </UIStep.Content>
                  </UIStep>
                  <UIStep>
                    <UIIcon name='dollar'/>
                    <UIStep.Content>
                    {
                      form.price && form.price.value ?
                      getFormattedPrice(Number(form.price.value) * .9) :
                      "Enter a price!"
                    }
                    </UIStep.Content>
                  </UIStep>
                </UIStep.Group>
              </UIGrid.Column>
            </UIGrid.Row>
            <UIGrid.Row>
              <UIGrid.Column>
                <UIContainer fluid>
                  {"How much will you charge per serving? Please enter a whole number. \
                  Feedme will charge a fee from the purchase price. \
                  The amount you'll receive is displayed above."}
                </UIContainer>
              </UIGrid.Column>
            </UIGrid.Row>
          </UIGrid>
        </UIForm.Field>
        <br />

        <UIForm.Field>
          <UIGrid>
            <UIGrid.Row>
              <UIGrid.Column width="8">

                <UIForm.Field
                  error={modelError(form.serving_date)}
                >
                  <UIHeader sub>
                    {"Serving Date"}
                  </UIHeader>
                  <Control
                    type="datetime-local"
                    model=".serving_date"
                    validators={{
                      isRequired,
                    }}
                    component={UIInput}
                  />
                </UIForm.Field>

                <UIContainer fluid>
                  {"Specify when you want to serve your meal.\
                  The timing will depend on which delivery method you choose,\
                  and the specific user buying your meal."}
                </UIContainer>
                <br />
                <UIContainer fluid>
                  {"Keep in mind you'll be able to work out a more specific time\
                  based on individual circumstance with the buyer after he/she \
                  signs up for your meal."}
                </UIContainer>

              </UIGrid.Column>
              <UIGrid.Column width="8">

                <UIForm.Field
                  error={modelError(form.rsvp_date)}
                >
                  <UIHeader sub>
                    {"RSVP Date"}
                  </UIHeader>
                  <Control
                    type="datetime-local"
                    model=".rsvp_date"
                    validators={{
                      isRequired,
                    }}
                    component={UIInput}
                  />
                </UIForm.Field>
                <UIContainer fluid>
                  {"This is the time by which \
                  anyone who is interested in your meal must sign up. \
                  Set this far enough in advance so you'll have time \
                  to prepare the requested number of servings."}
                </UIContainer>
                <br />
                <UIContainer fluid>
                  {"However, keep in mind that you'll likely \
                  have more users sign up \
                  if the RSVP date is closer to the serving date."}
                </UIContainer>

              </UIGrid.Column>
            </UIGrid.Row>
          </UIGrid>
        </UIForm.Field>
        <br />

        <UIForm.Field>
          <UIHeader sub>
            {"Delivery Methods"}
          </UIHeader>
          <UIForm.Group inline >
            <Control.checkbox
              model=".accept_delivery"
              label="Delivery"
              component={UIForm.Input}
            />
            <Control.checkbox
              model=".accept_pickup"
              label="Pickup"
              component={UIForm.Input}
            />
            <Control.checkbox
              model=".accept_dine_in"
              label="Dine-In"
              component={UIForm.Input}
            />
          </UIForm.Group>
          <UIContainer fluid>
            {"Choose the food delivery methods you are comfortable with. \
            You can choose to drop off the meal at the buyers house,\
            allow them to pick it up from your place,\
            or host them for a dine-in \"pop-up restaurantr\"."}
          </UIContainer>
          <br />
          <UIContainer fluid>
            {"You must choose at least one option,\
            and you can work out all the details with the buyer \
            after they've signed up."}
          </UIContainer>
        </UIForm.Field>
        <br />

        <UIForm.Field>
          <UIHeader sub>
            {"Photo"}
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
        </UIForm.Field>
        <UIForm.Field>
          <UIContainer fluid>
            {"Choose a good image to represent your meal. \
            This will be displayed on the meal search page,\
            so make sure the lighting and presentation are perfect. "}
          </UIContainer>
          <br />
          <UIContainer fluid>
            {"This image MUST be one that you took yourself. \
            If you don't have any photos, make the meal and take one! \
            You should not be cooking something for Feedme that you are not \
            already a seasoned expert at making. "}
          </UIContainer>
        </UIForm.Field>

        <UIMessage
          error
          header="Oops!"
          list={errors}
        />

        <UIForm.Group inline>
          <UIForm.Button
            type="submit"
            color="blue"
            basic
          >
            Submit
          </UIForm.Button>
          <UIForm.Button
            color="red"
            onClick={this.handleReset}
            disabled={resetEnabled}
            basic
          >
            Reset
          </UIForm.Button>
        </UIForm.Group>

        {/* <UIMessage */}
        {/*   success */}
        {/*   header='Form Completed' */}
        {/*   content="You've created a meal!" */}
        {/* /> */}
        {/* <UIMessage */}
        {/*   warning */}
        {/* > */}
        {/*   <UIMessage.Header> */}
        {/*     Could you check this! */}
        {/*   </UIMessage.Header> */}
        {/*   <UIMessage.List> */}
        {/*     <Errors */}
        {/*       model=".name" */}
        {/*       messages={{ */}
        {/*         isRequired: 'Please provide a name', */}
        {/*       }} */}
        {/*       show={(field) => field.touched} */}
        {/*       wrapper={UIMessage.Item} */}
        {/*     /> */}
        {/*     <Errors */}
        {/*       model=".description" */}
        {/*       messages={{ */}
        {/*         isRequired: "Enter a description", */}
        {/*       }} */}
        {/*       show={(field) => field.touched} */}
        {/*       wrapper={UIMessage.Item} */}
        {/*     /> */}
        {/*     <Errors */}
        {/*       model=".image" */}
        {/*       messages={{ */}
        {/*         isRequired: "Don't forget the photo!", */}
        {/*       }} */}
        {/*       show={(field) => field.touched && !field.focus} */}
        {/*       component={UIMessage.Item} */}
        {/*     /> */}
        {/*   </UIMessage.List> */}
        {/* </UIMessage> */}

      </UIForm>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.status.newMeal,
    newMealId: state.forms.newMeal.newMealId,
    form: state.forms.forms.newMeal,
  }
}


export default connect(mapStateToProps)(NewMealForm)
