/* eslint-disable no-unused-vars */
import React, { Component, } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Route, Switch, } from 'react-router-dom'
import { push, goBack } from 'react-router-redux'
import {
  Button as UIButton,
  Divider as UIDivider,
  Form as UIForm,
  Grid as UIGrid,
  Header as UIHeader,
  Icon as UIIcon,
  Message as UIMessage,
  Segment as UISegment,
} from 'semantic-ui-react'

const Modal = ({ match, history, children, dispatch, }) => {
  // console.log(children);
  if (!children) {
    return null
  }
  const back = (e) => {
    e.stopPropagation()
    dispatch(goBack())
  }
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        // background: 'rgba(255, 255, 255, 0.75)',
        background: 'rgba(0, 0, 0, 0.65)',
        zIndex: 900
      }}
    >
      <div
        onClick={back}
        style={{
          position: 'fixed',
          top: '9%',
          right: '5%',
          color: 'rgba(0, 0, 0, 0.85)',
          fontSize: '50px',
          cursor: 'pointer',
        }}
      >
        &#215;
      </div>

      <div className='ui segment raised'
        onClick={(e) => {e.stopPropagation()}}
        style={
        {
          position: 'fixed',
          top: '20%',
          left: '10%',
          paddingRight: 25,
          paddingLeft: 25,
          paddingTop: 20,
          paddingBottom: 10,
          width: '80%',
          height: 'auto',
          maxHeight: '80%',
          zIndex: '1000',
          overflowY: 'auto',
        }
      }>
          {children}
      </div>
    </div>
  )
}

Modal.PropTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(Modal)
