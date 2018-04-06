/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Control, Errors, Form, Field,} from 'react-redux-form'
import {
  Button as UIButton,
  Dropdown as UIDropdown,
  Form as UIForm,
  Label as UILabel,
  Menu as UIMenu,
} from 'semantic-ui-react'

import {
  isRequired,
  isNumber,
  isPositiveNumber,
  requiredError,
} from '../lib/validators'

const Dropdown = ({
  model,
  options,
  placeholder,
  label,
  dispatch,
  ...rest
}) => {

  const mapOptions = (options) => {
    return options.map((o) => {
      return (
        <option key={o.value} value={o.value}>
          {o.text}
        </option>
      )
    })
  }
  const onDropdownChange = (e, data) => {
    dispatch(actions.change(model, data.value))
  }
  const onClick = () => {
    dispatch(actions.focus(model))
  }
  const onBlur = () => {
    dispatch(actions.blur(model))
    // dispatch(actions.setTouched(model))
  }

  return (
    <UIForm.Field>
      <UIForm.Select
        options={options}
        selection
        placeholder={placeholder}
        onChange={onDropdownChange}
        onClick={onClick}
        onBlur={onBlur}
        label={label}
      />
    </UIForm.Field>
  )
}
export default connect()(Dropdown)
