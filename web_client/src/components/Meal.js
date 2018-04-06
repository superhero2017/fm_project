/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  Button as UIButton,
  Container as UIContainer,
  Divider as UIDivider,
  Grid as UIGrid,
  Header as UIHeader,
  Icon as UIIcon,
  Image as UIImage,
} from 'semantic-ui-react'

import {
  getFormattedPrice,
  getFormattedRsvpDeadline,
  getFormattedServingDate,
} from '../lib/format'

import { getDefaultMealImage, getProfilePath,} from '../urls'

import Rating from '../components/Rating'

export default class Meal extends Component {
  static propTypes = {
    meal: PropTypes.object
  }

  render() {
    const { meal } = this.props
    const img = meal.image ? meal.image : getDefaultMealImage()
    console.log(img)
    return (
      <div>
        <UIDivider hidden />
        <UIGrid>
          <UIGrid.Column width={8}>
            <UIImage src={img} />
            <Rating stars={5} rating={3.74} />
          </UIGrid.Column>
          <UIGrid.Column width={8}>
            <UIHeader as='h1'>
              {meal.name}
              <UIDivider />
              <UIHeader.Subheader as='h2'>
              <UIIcon name='user outline'/>
                {"Prepared by "}
                <Link
                  to={getProfilePath(meal.owner)}
                >
                  {meal.owner_name}
                </Link>
              </UIHeader.Subheader>
              <br />
              <UIHeader.Subheader as='h2'>
                <UIIcon name='shopping basket'/>
                {meal.servings_available} Servings Available
              </UIHeader.Subheader>
              <br />
              <UIHeader.Subheader as='h2'>
                <UIIcon name='hourglass one'/>
                RSVP by {getFormattedRsvpDeadline(meal.rsvp_date)}
              </UIHeader.Subheader>
              <UIHeader.Subheader as='h2'>
                <UIIcon name='calendar'/>
                Served at {getFormattedServingDate(meal.serving_date)}
              </UIHeader.Subheader>
              <UIDivider />
              <UIGrid>
                <UIGrid.Row>
                  <UIGrid.Column width="3">
                    <UIHeader as='h3'>
                      {"What I'll make"}
                    </UIHeader>
                  </UIGrid.Column>
                  <UIGrid.Column width="13">
                    <UIHeader.Subheader as='h2'>
                      {meal.description}
                    </UIHeader.Subheader>
                  </UIGrid.Column>
                </UIGrid.Row>
                <UIDivider />
                <UIGrid.Row>
                  <UIGrid.Column width="3">
                    <UIHeader as='h3'>
                      {"What's in it"}
                    </UIHeader>
                  </UIGrid.Column>
                  <UIGrid.Column width="13">
                    <UIHeader.Subheader as='h2'>
                      {meal.ingredients}
                    </UIHeader.Subheader>
                  </UIGrid.Column>
                </UIGrid.Row>
                <UIDivider />
                <UIGrid.Row>
                  <UIGrid.Column width="3">
                    <UIHeader as='h3'>
                      {"What you'll get"}
                    </UIHeader>
                  </UIGrid.Column>
                  <UIGrid.Column width="13">
                    <UIHeader.Subheader as='h2'>
                      {meal.serving_description}
                    </UIHeader.Subheader>
                  </UIGrid.Column>
                </UIGrid.Row>
              </UIGrid>
            </UIHeader>
          </UIGrid.Column>
        </UIGrid>
      </div>
    )
  }
}
