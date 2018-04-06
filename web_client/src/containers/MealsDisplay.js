/* eslint-disable no-unused-vars */
import React, { Component, } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Container } from 'semantic-ui-react'
import { mealsRequest, invalidateMealList, } from '../actions/'
import MealsList from '../components/MealsList'


class MealsDisplay extends Component {
  static propTypes = {
    meals: PropTypes.array.isRequired,
    status: PropTypes.object.isRequired,
    mealsRequest: PropTypes.func.isRequired,
    // requesting: PropTypes.bool.isRequired,
    // lastUpdated: PropTypes.number,
    // mealsRequest: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    this.props.mealsRequest()
  }

  handleRefreshClick () {
    this.props.mealsRequest()
  }

  render() {
    const { meals, status: { requesting, lastUpdated, }, } = this.props
    const isEmpty = meals.length === 0
    // console.log("rendering mealsdisplay")
    // console.log(this.props)

    return (
      <div>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!requesting &&
            <a href=''
               onClick={this.handleRefreshClick}>
               Refresh
             </a>
          }
        </p>
        {isEmpty
          ? (requesting ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: requesting ? 0.5 : 1 }}>
            <MealsList meals={meals} />
          </div>

        }



      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log("map state to props")
  const { meals, status, } = state.meals
  // console.log(state.meals)
  return {
    meals,
    status,
  }
}

export default connect(mapStateToProps, { mealsRequest } )(MealsDisplay)
