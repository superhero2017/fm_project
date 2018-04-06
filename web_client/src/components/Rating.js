/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import {
  Icon as UIIcon,
} from 'semantic-ui-react'


const Rating = (props) => {
  const { stars, rating, } = props

  var r = rating
  return (
    <div>
    {[...Array(stars)].map((cur, index) => {
      r -= 1
      if (r + 1>= .75) {
        return (
          <UIIcon key={index} name='star' />
        )
      }
      if (r + 1< .75 && r + 1>= .25) {
        return (
          <UIIcon  key={index}  name='star half empty'/>
        )
      }
      return (
        <UIIcon key={index} name='empty star' />
      )

    })}
    </div>
  )
}

Rating.propTypes = {
  stars: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
}

export default Rating
