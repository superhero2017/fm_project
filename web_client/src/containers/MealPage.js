/* eslint-disable no-unused-vars */
import React, { Component, } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Route, Switch, } from 'react-router-dom'
import { push } from 'react-router-redux'
import {
  Button as UIButton,
  Container as UIContainer,
  Divider as UIDivider,
  Grid as UIGrid,
  Header as UIHeader,
  Icon as UIIcon,
  Image as UIImage,
  Loader as UILoader,
  Message as UIMessage,
  Segment as UISegment,
} from 'semantic-ui-react'

import {
  getFormattedPrice,
  getFormattedRsvpDeadline,
  getFormattedServingDate,
} from '../lib/format'

import {
  getMealById, getCurrentUserId,
  getProfPicById, getProfileById,
 } from '../selectors'
import { mealRequest, profileRequest, } from '../actions/'

import { getDefaultMealImage, getProfilePath, getDefaultProfilePhoto, } from '../urls'

import withAccessControl from '../hocs/withAccessControl'
import MealEditPanel from '../containers/MealEditPanel'
import RsvpForm from '../containers/forms/RsvpForm'
import Meal from '../components/Meal'
import Rating from '../components/Rating'
import RsvpView from '../components/RsvpView'

class MealPage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    meal: PropTypes.object,
    status: PropTypes.object.isRequired,
    isOwnMeal: PropTypes.bool.isRequired,
    profile: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }


  componentDidMount() {
    console.log("will this be an infinite loop?")
    const { id, meal, dispatch, profile } = this.props
    if (!meal) {
      dispatch(mealRequest(id))
    }
    if (meal && !profile) {
      dispatch(profileRequest(meal.owner))
    }
    window.scrollTo(0, 0)
  }

  componentWillUpdate(nextProps) {
    const { meal, profile, } = nextProps
    const { dispatch } = this.props
    console.log("COMPONENET WILL UPDATE");
    console.log(meal)
    if (!meal && this.props.meal) {
      this.props.dispatch(push('/'))
    }
    if (meal && !profile) {
      dispatch(profileRequest(meal.owner))
    }
  }

  render() {
    const { id, meal, isOwnMeal, status, profile, } = this.props
    const img = meal && meal.image ? meal.image : getDefaultMealImage()
    const prof_pic = profile && profile.image ? profile.image : getDefaultProfilePhoto()

    if (meal) {
      return (
        <div>
          <div>
            <UIDivider hidden />
            <UIGrid stackable>
              <UIGrid.Column width={8}>
                <UIImage src={img} />
                <UIDivider hidden />
                <UIGrid>
                  <UIGrid.Row>
                    <UIGrid.Column width="9">
                      <span>
                        <UIHeader size="large">
                          <span>
                            {"$" + getFormattedPrice(meal.price)}
                          </span>
                          <span className="sub header" style={{display: "inline"}}>
                            {" per person"}
                          </span>
                        </UIHeader>
                      </span>
                      <Rating stars={5} rating={4.5} />
                    </UIGrid.Column>
                    <UIGrid.Column width="7" textAlign="right">
                      <UIButton color="blue"
                        disabled={isOwnMeal}
                        as={Link} to={`/meals/${id}/rsvp`}
                      >
                        {"Buy this meal"}
                      </UIButton>
                    </UIGrid.Column>
                  </UIGrid.Row>
                </UIGrid>
                <UIDivider />
              </UIGrid.Column>
              <UIGrid.Column width={8}>
                <UIHeader as='h1'>
                  {
                    isOwnMeal ?
                    <UIGrid>
                      <UIGrid.Row>
                        <UIGrid.Column width="12">
                          {meal.name}
                        </UIGrid.Column>
                        <UIGrid.Column width="4" textAlign='right'>
                          <UIButton color="red" as={Link} to={`/meals/${id}/edit`}>
                            Edit
                          </UIButton>
                        </UIGrid.Column>
                      </UIGrid.Row>
                    </UIGrid> :
                    meal.name
                  }

                  <UIDivider />
                  <UIGrid>
                    <UIGrid.Row>
                      <UIGrid.Column width="10">
                        <UIHeader.Subheader as='h2'>
                          <UIIcon name='shopping basket'/>
                          {meal.servings_available} Servings Available
                        </UIHeader.Subheader>
                        {
                          meal.accept_delivery ?
                          <UIHeader.Subheader as='h2'>
                            <UIIcon name='checkmark'/>
                            Delivery
                          </UIHeader.Subheader> :
                          <div />
                        }
                        {
                          meal.accept_pickup ?
                          <UIHeader.Subheader as='h2'>
                            <UIIcon name='checkmark'/>
                            Pickup
                          </UIHeader.Subheader> :
                          <div />
                        }
                        {
                          meal.accept_dine_in ?
                          <UIHeader.Subheader as='h2'>
                            <UIIcon name='checkmark'/>
                            Dine-In
                          </UIHeader.Subheader> :
                          <div />
                        }
                        <br />
                        <UIHeader.Subheader as='h2'>
                          <UIIcon name='hourglass one'/>
                          RSVP by {getFormattedRsvpDeadline(meal.rsvp_date)}
                        </UIHeader.Subheader>
                        <UIHeader.Subheader as='h2'>
                          <UIIcon name='calendar'/>
                          Served at {getFormattedServingDate(meal.serving_date)}
                        </UIHeader.Subheader>
                      </UIGrid.Column>
                      <UIGrid.Column width="6" textAlign='right'>
                      <UIImage size='tiny' src={prof_pic}
                        shape='circular' floated='right'
                      />
                      <UIHeader.Subheader as='h2'>
                        <UIIcon name='user outline'/>
                          {"Prepared by "}
                          <Link
                            to={getProfilePath(meal.owner)}
                          >
                            {meal.owner_name}
                          </Link>
                      </UIHeader.Subheader>


                      </UIGrid.Column>
                    </UIGrid.Row>
                  </UIGrid>

                  <UIDivider />
                  <UIGrid>
                    <UIGrid.Row>
                      <UIGrid.Column width="4">
                        <UIHeader as='h3'>
                          {"What I'll make"}
                        </UIHeader>
                      </UIGrid.Column>
                      <UIGrid.Column width="12">
                        <UIHeader.Subheader as='h2'>
                          {meal.description}
                        </UIHeader.Subheader>
                      </UIGrid.Column>
                    </UIGrid.Row>
                    <UIDivider />
                    <UIGrid.Row>
                      <UIGrid.Column width="4">
                        <UIHeader as='h3'>
                          {"What's in it"}
                        </UIHeader>
                      </UIGrid.Column>
                      <UIGrid.Column width="12">
                        <UIHeader.Subheader as='h2'>
                          {meal.ingredients}
                        </UIHeader.Subheader>
                      </UIGrid.Column>
                    </UIGrid.Row>
                    <UIDivider />
                    <UIGrid.Row>
                      <UIGrid.Column width="4">
                        <UIHeader as='h3'>
                          {"What you'll get"}
                        </UIHeader>
                      </UIGrid.Column>
                      <UIGrid.Column width="12">
                        <UIHeader.Subheader as='h2'>
                          {meal.serving_description}
                        </UIHeader.Subheader>
                      </UIGrid.Column>
                    </UIGrid.Row>
                  </UIGrid>
                </UIHeader>
              </UIGrid.Column>
            </UIGrid>
            <UIDivider hidden />
          </div>
          <Switch>
            {/* Do we need to also make sure user is the owner of meal? */}
            <Route
              exact
              path="/meals/:id/edit"
              component={withAccessControl(MealEditPanel)}
            />
            <Route
              exact
              path="/meals/:id/rsvp"
              component={withAccessControl(RsvpView)}
            />
          </Switch>
        </div>
      )
    } else {
      return (
        <div>
          {status.requesting ?
            <UILoader active>Loading Meal</UILoader> :
            <UIMessage
              error
              header="Could not find meal"
            />
          }
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps)
  const { id } = ownProps.match.params
  const meal = getMealById(state, id)
  const isOwnMeal = meal && meal.owner === getCurrentUserId(state) ? true : false
  const profile = meal && meal.owner ?
    getProfileById(state, meal.owner) : undefined

  const { status } = state.meals
  return {
    id,
    meal,
    isOwnMeal,
    status,
    profile,
  }
}

export default connect(mapStateToProps)(MealPage)
