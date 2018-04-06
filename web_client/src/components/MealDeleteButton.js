/* eslint-disable no-unused-vars */
import React, { Component, } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Route, Switch, } from 'react-router-dom'
import {
  Button as UIButton,
  Container as UIContainer,
  Loader as UILoader,
  Segment as UISegment,
  Message as UIMessage,
} from 'semantic-ui-react'

import { getMealById, getUserId, } from '../selectors'
import { mealRequest, } from '../actions/'

export default class MealPage extends Component {
  static propTypes = {
    handleDeleteClick: PropTypes.func.isRequired,
  }

  render() {
    const { handleDeleteClick, } = this.props
    // console.log(handleDeleteClick)
    return (
      <div>
        <UIButton color="red" onClick={handleDeleteClick}>
          {"Delete this meal"}
        </UIButton>
      </div>
    )
  }
}
