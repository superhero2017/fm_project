/* eslint-disable no-unused-vars */
import React, { Component, } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, } from 'react-router-dom'
import { StripeProvider } from 'react-stripe-elements';
import {
  Container as UIContainer,
} from 'semantic-ui-react'

import { checkCredentials } from '../lib/check-auth';

import SignupForm from '../containers/SignupForm'
import LoginForm from '../containers/LoginForm'

import MainPage from '../components/MainPage'

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentWillMount() {
    checkCredentials(this.props.dispatch);
  }

  render() {
    const { path } = this.props
    return (
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
        <div className="app">
          <base href="/" />
          <Switch>
            <Route
              exact
              path="/signup"
              component={SignupForm}
            />
            <Route
              exact
              path="/login"
              component={LoginForm}
            />
            <Route
              path="/"
              component={MainPage}
            />
          </Switch>
        </div>
      </StripeProvider>
    )
  }
}

export default connect()(App)
