/* global Stripe */
/* eslint-disable no-unused-vars */

import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, } from 'react-router'
import { actions, Control, Errors, Form, } from 'react-redux-form'
import { replace, push, } from 'react-router-redux'
import { CardElement } from 'react-stripe-elements';
import {
  Button as UIButton,
  Divider as UIDivider,
  Form as UIForm,
  Grid as UIGrid,
  Header as UIHeader,
  Icon as UIIcon,
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
import {
  getFormattedCardNumber
} from '../../lib/format'

import { rsvpRequest, } from '../../actions/'


class RsvpBillingSection extends Component {
  static propTypes = {
    // card: PropTypes.object.isRequired,
    onCardChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      usingNewCard: false,
      usingOldCard: false
    }
  }

  componentDidMount() {

    // const { card } = this.props

    // card.mount('#card-elt');
  }

  handleUseNewCardClick = () => {
    const { usingNewCard } = this.state
    if (!usingNewCard) {
      this.setState({
        usingNewCard: true,
        usingOldCard: false,
      })
      this.props.setUseExistingCard(false)
    }
  }

  handleUseOldCardClick = () => {
    const { usingNewCard, usingOldCard } = this.state
    const { useExistingCard } = this.props.form
    if (!usingOldCard) {
      this.setState({
        usingNewCard: false,
        usingOldCard: true,
      })
      this.props.setUseExistingCard(true)
    }
  }

  // Don't use Control.button for the submission! It Causes errors
  render() {

    const { usingNewCard } = this.state
    const {
      onCardChange, customer,
      setUseExistingCard, form,
    } = this.props
    const useExistingCard = form.useExistingCard.value
    const cardName = customer ? customer.billing_type.toLowerCase() : ""
    const cardStyle = {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        // fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '15px',

        '::placeholder': {
          color: '#CFD7E0',
        },
      }
    }

    return (
      <UIForm.Field>
        <UIHeader>
          Payment Method
        </UIHeader>

      {
        !customer ?
        <UIForm.Field>
          <label>
            Card details
            <CardElement style={cardStyle} onChange={onCardChange}/>
          </label>
        </UIForm.Field> :
        <UIForm.Field>
          <UIGrid>
            <UIGrid.Row>
            <UIGrid.Column width='12'>
              <UISegment disabled={!useExistingCard}>
                <UIIcon name={cardName} size='big' />
                <span>
                <UIHeader as='h3' floated='right'>
                {getFormattedCardNumber(customer.billing_card_number)}
                </UIHeader>
                </span>
              </UISegment>
            </UIGrid.Column>
            <UIGrid.Column width='4' verticalAlign='middle'>
              <UIForm.Button
                type='button'
                color='blue'
                onClick={this.handleUseOldCardClick}
                disabled={useExistingCard}
                basic
              >
                {"Use this card"}
              </UIForm.Button>
            </UIGrid.Column>
            </UIGrid.Row>
            <UIGrid.Row>
            {
              usingNewCard ?
              <UIGrid.Column width='12'>
                <UISegment disabled={!usingNewCard}>
                  <CardElement style={cardStyle} onChange={onCardChange}/>
                </UISegment>
              </UIGrid.Column> :
              <div />
            }
              <UIGrid.Column width='4' verticalAlign='middle'>
              <UIButton
                type='button'
                color='blue'
                onClick={this.handleUseNewCardClick}
                disabled={usingNewCard}
                basic
              >
                {"Use new card"}
              </UIButton>
              </UIGrid.Column>
            </UIGrid.Row>
          </UIGrid>
        </UIForm.Field>
      }
      </UIForm.Field>
    )
  }
}

          // <UIForm.Field>
          //   <Control.text
          //     model=".nameOnCard"
          //     validators={{
          //       isRequired,
          //     }}
          //     component={UIForm.Input}
          //     mapProps={{
          //       label: "Name on Card",
          //       error: requiredError,
          //       // placeholder: "Enter a number",
          //     }}
          //   />
          // </UIForm.Field>

export default RsvpBillingSection
