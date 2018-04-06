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
} from '../../lib/validators'
import { getFormattedPrice, } from '../../lib/format'
import { getMealPath, } from '../../urls'
import {
  chefApplyRequest,
  resetchefApplicationForm,
} from '../../actions/'

import VerticalStep from '../../components/VerticalStep'

var classNames = require('classnames');


class ChefApplicationForm extends Component {
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

  // Reset the form on unmount
  componentWillUnmount() {
    const { dispatch, } = this.props
    dispatch(actions.reset("forms.chefApplication"))
  }

  handleSubmit = (values) => {
    const { dispatch, } = this.props
    // console.log("FORM HANDLESUBMIT")
    // console.log(meal)
    const img = values.kitchen_image
    const st = values.safety_training
    const application = {
      ...values,
      safety_training: st === "0" ? false : true,
      kitchen_image: img ? img[0] : null
    }
    dispatch(chefApplyRequest(application))
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

    console.log("Chef application form", form);

    // const warning  = (form.name && !form.name.valid && form.name.touched) ||
    //   (form.description && !form.description.valid && form.description.touched) ||
    //   (form.image && !form.image.valid && form.image.touched)
    //
    // // This is not working
    // const resetEnabled = form.initialValue !== form.value
    //
    //
    // // this will always be in error so can't really use it to display error msgs??
    // // const isRequired = (val) => val && val.length > 0
    // const requiredError = (props) => {
    //   // console.log("REQUIRED ERROR")
    //   // console.log(props)
    //   const { submitFailed, retouched, focus, touched, valid, validated, } = props.fieldValue
    //   return (submitFailed && !retouched && !focus) ||
    //   (!focus && touched && (!valid && !validated))
    // }
    //
    //
    // // Can't mapProps to the UIForm, so use class names
    // const formClasses = classNames(
    //   requesting ? "loading" : false,
    //   successful ? "success " : false,
    //   errors.length ? "error " : false,
    //   warning ? "warning " : false,
    // )
    // // const formClasses=""
    // // console.log(formClasses)
    //
    // console.log(form)

    console.log("got an error in form?");
    console.log(errors);
    return (

      <UIForm
        success={successful}
        loading={requesting}
        error={errors && errors.length > 0}
        as={Form}
        model="forms.chefApplication"
        onSubmit={v => this.handleSubmit(v)}
      >
        <VerticalStep number="1" title="Tell us about yourself">
          <UIForm.Field>
            <UIContainer fluid>
              {"So you want to be a Feedme chef? Tell us why! Include information such as your cooking history, why you're passionate about cooking, and what types of dishes you love to prepare."}
            </UIContainer>
          </UIForm.Field>
          <UIForm.Field
            error={false /*modelError(form.name)*/}
          >
            <Control.textarea
              model=".about_yourself"
              validators={{
                // isRequired,
              }}
              component={UIForm.TextArea}
              mapProps={{
                // required: true,
                // placeholder: "What's your meal called?",
                // width: 14,
              }}
            />
          </UIForm.Field>
        </VerticalStep>

        <VerticalStep number="2" title="Your Kitchen">
          <UIForm.Field>
            <UIContainer fluid>
              {"In order to ensure the quality of Feedme meals, we need to make sure that they are prepared in clean, safe kitchens. Please upload a picture of the kitchen in which you will be cooking so we can make sure yours is up to snuff."}
              <br />
              <br />
              {"Try to include as much detail as possible-- stove, sink, etc.-- in one shot."}
            </UIContainer>
          </UIForm.Field>
          <UIForm.Field>
            <Control.file
              model=".kitchen_image"
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
        </VerticalStep>

        <VerticalStep number="3" title="Safety Training">
          <UIForm.Field>
            <UIContainer fluid>
              {"While no formal training is required to be a Feedme chef, we, your customers, and the community would appreciate it if our chefs had as much certified knowledge about the safe preparation of food as possible."}
              <br />
              <br />
              {"To that end, we encourage all our chefs to become certified in the safe handling of food. A convenient method by which they can do this is to complete the 4-5 hour training on food safety provided by the online learning platform "}
              <a href="https://alison.com/learn/food-safety"> Alison. </a>
              <br />
              <br />
              {"If you do choose to complete such a course and email us with proof of its completion (a screenshot, email you received, etc.), we will add a special badge to your profile designating you have completed such training, and you will be more likely to receive customers."}
              <br />
              <br />
              {"Additionally, if you happen to be a professional chef, feel free to let us know."}
            </UIContainer>
          </UIForm.Field>
          <UIForm.Field>
            <Control.radio
              model=".safety_training"
              validators={{
                // isRequired,
              }}
              value="0"
            />
            <UILabel basic>
              {"I have not yet completed any food safety training, but will strongly consider doing so"}
            </UILabel>
          </UIForm.Field>
          <UIForm.Field>
            <Control.radio
              model=".safety_training"
              validators={{
                // isRequired,
              }}
              value="1"
            />
            <UILabel basic>
              {"I have completed some form of training, and I will describe it and provide a link to proof of its completion below"}
            </UILabel>
          </UIForm.Field>
          {form.safety_training.value === "1" ?
          <UIForm.Field
            error={false /*modelError(form.name)*/}
          >
            <Control.textarea
              model=".safety_description"
              validators={{
                // isRequired,
              }}
              component={UIForm.TextArea}
              mapProps={{
                // width: 14,
              }}
            />
          </UIForm.Field> :
          <div />
          }
        </VerticalStep>
        <VerticalStep number="4" title="That's It!">
          <UIContainer fluid>
            {"Thanks for applying to be a Feedme Chef! We will review your application and get back to you as soon as possible."}
          </UIContainer>
        </VerticalStep>
        <UIMessage
          error
          header="There was a problem with your request!"
          list={errors}
        />
        <UIForm.Button
          type="submit"
          color="blue"
          basic
        >
          Submit
        </UIForm.Button>
      </UIForm>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.status.chefApplication,
    form: state.forms.forms.chefApplication,
  }
}


export default connect(mapStateToProps)(ChefApplicationForm)
