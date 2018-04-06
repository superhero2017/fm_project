/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, } from 'react-router'
import { actions, Control, Errors, Form, } from 'react-redux-form'
import { replace, push, } from 'react-router-redux'
import {
  Button as UIButton,
  Divider as UIDivider,
  Form as UIForm,
  Grid as UIGrid,
  Header as UIHeader,
  Icon as UIIcon,
  Item as UIItem,
  List as UIList,
  Message as UIMessage,
  Segment as UISegment,
  Step as UIStep,
} from 'semantic-ui-react'

import {
  getMealById, getCurrentUserId,
} from '../../selectors'
import { getMealPath, } from '../../urls'
import {
  isRequired,
  isNumber,
  isPositiveNumber,
  requiredError,
} from '../../lib/validators'
import { rsvpRequest, } from '../../actions/'
import { DELIVERY_OPTIONS } from '../../constants'


const getDeliveryMethodText = (value) => {
  const method = DELIVERY_OPTIONS.filter((entry) => {
    return entry.value === value
  })
  return method[0].text
}

class RsvpConfirmSection extends Component {
  // static propTypes = {
  //   meal: PropTypes.object,
  //   userId: PropTypes.number,
  //   status: PropTypes.object,
  //   dispatch: PropTypes.func.isRequired,
  // }

  // Don't use Control.button for the submission! It Causes errors
  render() {

    const { meal, form, deliveryOptions, } = this.props
    const price = meal.price * form.servings.value

    return (
      <UIForm.Field>
        <UIHeader>
          Your Order
        </UIHeader>
        <UIItem.Group>
        <UIItem>
          <UIItem.Image size="small" src={meal.image} />

          <UIItem.Content>
            <UIItem.Header>
              {`${form.servings.value} Servings for $${price}`}
            </UIItem.Header>
            <UIItem.Description>
              <UIList>
                <UIList.Item>
                  <UIList.Icon name='shop' />
                  <UIList.Content>
                    {getDeliveryMethodText(form.delivery_method.value)}
                  </UIList.Content>
                </UIList.Item>
                <UIList.Item>
                  <UIList.Icon name='phone' />
                  <UIList.Content>
                    {"You can call or text your chef to work out any\
                    last minute details."}
                  </UIList.Content>
                </UIList.Item>
                <UIList.Item>
                  <UIList.Icon name='credit card' />
                  <UIList.Content>
                    {"Your card will be charged when you hit submit, \
                    and the chef will get paid once you get your meal"}
                  </UIList.Content>
                </UIList.Item>
              </UIList>
            </UIItem.Description>
          </UIItem.Content>

        </UIItem>
        </UIItem.Group>
      </UIForm.Field>
    )
  }
}


export default RsvpConfirmSection
