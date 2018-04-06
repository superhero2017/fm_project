/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, } from 'react-router'
import {
  Icon as UIIcon,
  Step as UIStep,
} from 'semantic-ui-react'

const CheckoutStep = ({ stage }) => {
  return (
    <UIStep.Group fluid>
      <UIStep active={stage === 0} completed={stage > 0}>
        <UIIcon name='food' />
        <UIStep.Content>
          <UIStep.Title>Details</UIStep.Title>
          <UIStep.Description>Choose your meal options</UIStep.Description>
        </UIStep.Content>
      </UIStep>

      <UIStep active={stage === 1} disabled={stage < 1} completed={stage > 1}>
        <UIIcon name='payment' />
        <UIStep.Content>
          <UIStep.Title>Billing</UIStep.Title>
          <UIStep.Description>Enter billing information</UIStep.Description>
        </UIStep.Content>
      </UIStep>

      <UIStep active={stage === 2} disabled={stage < 2}>
        <UIIcon name='info' />
        <UIStep.Content>
          <UIStep.Title>Confirm Order</UIStep.Title>
        </UIStep.Content>
      </UIStep>
    </UIStep.Group>
  )
}

export default CheckoutStep
