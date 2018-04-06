/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {
  Button as UIButton,
  Container as UIContainer,
  Grid as UIGrid,
  Image as UIImage,
  Header as UIHeader,
  Divider as UIDivider,
  Segment as UISegment,
} from 'semantic-ui-react'

import { getMealById, getUserId, } from '../selectors'
import { deleteMealRequest } from '../actions/'

import Meal from '../containers/MealEditForm'
import MealDeleteButton from '../components/MealDeleteButton'
import MealEditForm from '../containers/MealEditForm'

class MealEditPanel extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    meal: PropTypes.object,
    deleteMealRequest: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  // <MealDeleteButton handleDeleteClick={() => deleteMealRequest(meal)} />

  render() {
    const { id, meal, deleteMealRequest } = this.props
    function handleDeleteClick() {
      return deleteMealRequest.call(null,meal)
    }
    console.log(this.props)
    return (
      <div>
        <UISegment>
          <MealEditForm />
        </UISegment>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const meal = getMealById(state, id)
  // console.log(ownProps)
  return {
    id,
    meal,
  }
}

export default connect(mapStateToProps, { deleteMealRequest })(MealEditPanel)
