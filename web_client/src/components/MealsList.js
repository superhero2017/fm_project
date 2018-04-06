/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  Card as UICard,
  Container as UIContainer,
  Grid as UIGrid,
  Icon as UIIcon,
  Image as UIImage,
  Rating as UIRating,
} from 'semantic-ui-react'

import { getFormattedPrice, getFormattedRsvpDeadline,} from '../lib/format'

import { getDefaultMealImage, getProfilePath, getMealPath, } from '../urls'

import Rating from '../components/Rating'

export default class MealsList extends Component {
  static propTypes = {
    meals: PropTypes.array.isRequired
  }

  render() {
    return (
      <UICard.Group>
        {this.props.meals.map((meal, i) =>
          <UICard key={i}raised>
            <UIImage src={meal.image ? meal.image : getDefaultMealImage()}
              as={Link} to={getMealPath(meal.id)}
            />
            <UICard.Content>
              <UICard.Header>
              <UIGrid>
                <UIGrid.Row>
                  <UIGrid.Column width='12'>
                    {meal.name}
                  </UIGrid.Column>
                  <UIGrid.Column width='4' textAlign='right'>
                    {"$" + getFormattedPrice(meal.price)}
                  </UIGrid.Column>
                </UIGrid.Row>

              </UIGrid>
              </UICard.Header>
              <div>
                <Rating stars={5} rating={4.5} />
              </div>
              <UICard.Description>
                <div className='overflow'>
                  {meal.description}
                </div>
              </UICard.Description>
            </UICard.Content>
            <UICard.Content extra>
              <UIIcon name='hourglass half' />
              RSVP by {getFormattedRsvpDeadline(meal.rsvp_date)}
            </UICard.Content>
          </UICard>
        )}
      </UICard.Group>
    )
  }
}
