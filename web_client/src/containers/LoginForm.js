/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Control, Form, Errors, actions, } from 'react-redux-form'
import { Link } from 'react-router-dom'
import {
  // Button as UIButton,
  Container as UIContainer,
  Form as UIForm,
  Input as UIInput,
  Header as UIHeader,
  Message as UIMessage,
  Segment as UISegment,
} from 'semantic-ui-react'
import {
  Button as UIButton,
  Container as BSContainer
} from 'reactstrap';
import FacebookLogin from 'react-facebook-login'

import {
  isRequired,
  isEmail,
  requiredError,
} from '../lib/validators'
import { isMobile } from '../lib/responsive'
import { 
  routerSignupPath,
  fbLoginAppId,
} from '../urls'

// import { submitLoginForm, fetchPostLogin } from '../actions/'
import {
  loginRequest,
  facebookLoginRequest,
} from '../actions/'

// import { submitLoginForm, } from '../actions'
import { Password } from '../components/CustomControls.js'
import Logo from '../components/Logo'
import FMWarningMessage from '../components/FMWarningMessage'

import FMButton from '../components/ui/FMButton'
import FMDivider from '../components/ui/FMDivider'
import FMContainer from '../components/ui/FMContainer'

class LoginForm extends Component {
  static propTypes = {
    status: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  // Form submission
  handleSubmit = (values) => {
    this.props.dispatch(loginRequest(values))
  }

  handleFacebookResponse = (res) => {
    console.log(res);
    // Check for successful login (it's a nightmare bc react-facebook-login
    // eats status info before returning response to my callback)
    if ("id" in res) {
      console.log("fb response success");
      this.props.dispatch(facebookLoginRequest(res))
    }
  }
  // Event handlers
  resize = () => this.forceUpdate()

  // Lifecycle
  componentDidMount() {
    window.addEventListener('resize', this.resize)
    // Issue with Chrome auto-fill-- it doesn't update validity afterward
  }

  componentWillUnmount() {
    this.props.dispatch(actions.reset("forms.login"))
    window.removeEventListener('resize', this.resize)
  }

  render() {
    const { form } = this.props
    const isValid = form.valid
    const { requesting, successful, errors, } = this.props.status

    const loginFormClass = isMobile() ? 'login-form-mobile' : 'login-form'

    // this.props.dispatch(actions.change("forms.login.email", ""))
    if (form.pristine) {
      this.props.dispatch(actions.focus("forms.login.email"))
    }
    return (
      <div className="login-bg">
        <div className={loginFormClass}>
          <div style={{
            textAlign: "center",
            position: "relative"
          }}>
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
              model="forms.login"
              validateOn="change"
              onSubmit={(values) => this.handleSubmit(values)}
            >
              <FacebookLogin
                appId={fbLoginAppId()}
                scope="public_profile,email"
                callback={this.handleFacebookResponse}
                icon="fa-facebook"
                cssClass="txt btn btn-primary btn-block btn-fb"
                textButton=" Continue with Facebook"
              />

              <FMDivider text="or" />

              <div className="txt-secondary">

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
                  <Control
                    type="password"
                    model=".password"
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
              </div>

              <FMButton
                type="submit"
                block
                color="primary"
                disabled={!isValid}
              >
                Login
              </FMButton>
              <div style={{
                textAlign:"center",
                marginTop: "10px",
              }}>
                <div
                  style={{
                    "textAlign": "center",
                    marginBottom: "10px",
                    fontSize: "12px"
                }}>
                  <a href="#">
                    Forgot Password?
                  </a>
                </div>
                <FMDivider />
                <div
                  className="txt-primary"
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                }}>
                  {"Don't have an account? "}
                  <Link to={routerSignupPath()}>
                    {"Sign Up"}
                  </Link>
                </div>
              </div>
            </UIForm>
          </UISegment>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.status.login,
    form: state.forms.forms.login.$form
  }
}

export default connect(mapStateToProps)(LoginForm)
