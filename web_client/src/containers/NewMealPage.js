/* eslint-disable */
import React, { Component, PropTypes } from 'react'
// import { connect } from 'react-redux'
// import NewMealForm from '../components/NewMealForm'

import {
  checkIndexAuthorization,
  checkNewMealAuthorization,
} from '../lib/check-auth'

import NewMealForm from './NewMealForm'

class NewMealPage extends Component {
  render() {
    return (
      <div>
        <h2>
          Add a new meal
        </h2>
        <NewMealForm />
      </div>
    )
  }
}

// export default connect(mapStateToProps)(NewMealDisplay)
export default NewMealPage
