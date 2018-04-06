/* eslint-disable no-unused-vars */
import React, { Component, } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, } from 'react-router-dom'
import {
  Container as UIContainer,
  Header as UIHeader,
  Segment as UISegment,
} from 'semantic-ui-react'
import ReactPhoneInput from 'react-phone-input'

import { getCreatedMeals } from '../selectors'
import { mealsRequest, } from '../actions/'
import MealsList from '../components/MealsList'

class DashboardPage extends Component {
  static propTypes = {
    createdMeals: PropTypes.array.isRequired,
    mealsRequest: PropTypes.func.isRequired,
  }

  // Should only be requesting created meals when that api endpoint exists
  componentDidMount() {
    const { createdMeals, mealsRequest } = this.props
    if (!createdMeals.length) {
      mealsRequest()
    }
  }

  render() {
    const { createdMeals } = this.props
    const header = "Dashboard"
    return (
      <div>
        <UIHeader>
          {header}
        </UIHeader>

        <UISegment>
          Cool settings you can change here
        </UISegment>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const createdMeals = getCreatedMeals(state)
  console.log(createdMeals)
  return {
    createdMeals,
  }
}

export default connect(mapStateToProps, { mealsRequest, })(DashboardPage)
