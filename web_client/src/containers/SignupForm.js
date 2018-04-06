/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Control, Errors, Form, } from 'react-redux-form'
import {
  // Button as UIButton,
  Container as UIContainer,
  Form as UIForm,
  Input as UIInput,
  Header as UIHeader,
  Message as UIMessage,
  Segment as UISegment,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'

import {
  isRequired,
  isEmail,
  requiredError,
} from '../lib/validators'

import { isMobile } from '../lib/responsive'
import {
  getPrivacyPolicyUrl,
  getTermsOfServiceUrl,
  routerLoginPath,
  fbLoginAppId,
} from '../urls'
// import { submitSignupForm, fetchPostSignup } from '../actions/'
import {
  signupRequest,
  resetSignupForm,
  facebookLoginRequest,
} from '../actions/'
// import { submitLoginForm, } from '../actions'
import { Password } from '../components/CustomControls.js'
import Logo from '../components/Logo'
import FMWarningMessage from '../components/FMWarningMessage'

import FMButton from '../components/ui/FMButton'
import FMDivider from '../components/ui/FMDivider'
import FMContainer from '../components/ui/FMContainer'

class SignupForm extends Component {
  static propTypes = {
    status: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  // Handle Events
  handleSubmit = (values) => {
    // console.log("SignupForm handleSubmit")
    this.props.dispatch(signupRequest(values))
  }
  resize = () => this.forceUpdate()

  handleFacebookResponse = (res) => {
    console.log(res);
    // Check for successful login (it's a nightmare bc react-facebook-login
    // eats status info before returning response to my callback)
    if ("id" in res) {
      console.log("fb response success");
      this.props.dispatch(facebookLoginRequest(res))
    }
  }
  // Lifecycle
  componentDidMount() {
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(resetSignupForm())
    dispatch(actions.reset("forms.signup"))
    window.removeEventListener('resize', this.resize)
  }

  render() {
    const { form } = this.props
    const { requesting, successful, errors, } = this.props.status

    const isValid = form.valid
    const loginFormClass = isMobile() ? 'login-form-mobile' : 'login-form'
    return (
      <div className="login-bg">
        <div className={loginFormClass}>
          <div>
            <Logo text size="40px" color="white" />
          </div>
          <UISegment padded className="txt" style={{padding: "40px"}}>
            <UIForm
              loading={requesting}
              success={successful}
              error={errors && errors.length > 0}
              // Keeps the warning box displayed, but nothing is rendered if
              // there are no children passed from the Error component
              warning
              as={Form}
              model="forms.signup"
              validators={{
                '': {
                  passwordsMatch: (vals) => vals.password1 === vals.password2
                },
              }}
              validateOn="change"
              onSubmit={(values) => this.handleSubmit(values)}
            >
{/*
              <FMButton fb block>
                {"Continue with Facebook"}
              </FMButton>

  */}
            <FacebookLogin
              appId={fbLoginAppId()}
              scope="public_profile,email"
              callback={this.handleFacebookResponse}
              icon="fa-facebook"
              cssClass="txt btn btn-primary btn-block btn-fb"
              textButton=" Continue with Facebook"
            />
              <FMDivider text="or" />
              <UIForm.Field>
                <Control.text
                  model=".email"
                  validators={{
                    isRequired,
                    isEmail
                  }}
                  component={UIForm.Input}
                  mapProps={{
                    placeholder: "Email Address",
                    error: requiredError,
                  }}
                />
              </UIForm.Field>
              <Errors
                model=".email"
                show="touched"
                wrapper={FMWarningMessage}
                messages={{
                  isEmail: 'Enter a valid email address',
                }}
              />

              <UIForm.Field>
                <Control.text
                  model=".first_name"
                  validators={{
                    isRequired
                  }}
                  component={UIForm.Input}
                  mapProps={{
                    placeholder: "First Name",
                    error: requiredError,
                  }}
                />
              </UIForm.Field>

              <UIForm.Field>
                <Control.text
                  model=".last_name"
                  validators={{
                    isRequired
                  }}
                  component={UIForm.Input}
                  mapProps={{
                    placeholder: "Last Name",
                    error: requiredError,
                  }}
                />
              </UIForm.Field>

              <UIForm.Field>
                <Control
                  type="password"
                  model=".password1"
                  validators={{
                    isRequired
                  }}
                  component={UIForm.Input}
                  mapProps={{
                    placeholder: "Password",
                    error: requiredError,
                  }}
                />
              </UIForm.Field>

              <UIForm.Field>
                <Control
                  type="password"
                  model=".password2"
                  validators={{
                    isRequired
                  }}
                  component={UIForm.Input}
                  mapProps={{
                    placeholder: "Confirm Password",
                    error: requiredError,
                  }}
                />
              </UIForm.Field>

              <Errors
                model="forms.signup"
                show="touched"
                wrapper={FMWarningMessage}
                messages={{
                  passwordsMatch: 'Passwords do not match',
                }}
              />

              <UIMessage
                success
                header="You've signed up!"
              />
              <UIMessage
                error
                list={errors}
              />
              <FMButton
                type="submit"
                block
                color="primary"
                disabled={!isValid}
              >
                Sign up
              </FMButton>

              <br />
              <UIContainer textAlign="center">
              <div style={{
                "textAlign": "center",
                "color": "black",
              }}>
                By signing up, you agree to the
                <a href={getTermsOfServiceUrl()}>
                  {" Terms of Service"}
                </a>
                {" and"}
                <a href={getPrivacyPolicyUrl()}>
                  {" Privacy Policy"}
                </a>
              </div>
              </UIContainer>
            </UIForm>
            <FMDivider />
            <div style={{
              textAlign: "center",
              marginTop: "20px"
            }}>
              {"Already have an account? "}
              <Link to={routerLoginPath()}>
                {"Log In"}
              </Link>
            </div>
          </UISegment>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.status.signup,
    form: state.forms.forms.signup.$form
  }
}

export default connect(mapStateToProps)(SignupForm)
