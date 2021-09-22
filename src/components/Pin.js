import React from 'react'
import PropTypes from 'prop-types'
import { Circle } from '@react-google-maps/api'
import { colorMap } from '../utils'

const Pin = ({
  user,
  circleRadius,
  setPopup,
}) => {
  const {
    position,
    listingsCount,
    userTypeIdentifier,
    primaryTradeType,
  } = user

  const color = primaryTradeType
    ? colorMap[`${userTypeIdentifier}-${primaryTradeType}`]
    : colorMap[userTypeIdentifier]

  const handleClick = (e) => {
    const x = e.domEvent.clientX
    const y = e.domEvent.clientY
    setPopup({ x, y, user })
  }

  return (
    <Circle
      center={position}
      radius={circleRadius}
      label={listingsCount}
      onClick={handleClick}
      options={{
        strokeWeight: 2,
        strokeColor: color,
        fillColor: color,
        fillOpacity: 0.6,
        clickable: true,
        draggable: false,
        editable: false,
        visible: true,
        zIndex: 1,
      }}
    />
  )
}

Pin.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  circleRadius: PropTypes.number.isRequired,
  setPopup: PropTypes.func.isRequired,
}

export default Pin
