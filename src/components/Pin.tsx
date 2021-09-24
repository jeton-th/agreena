import React from 'react'
import { Circle } from '@react-google-maps/api'
import { colorMap } from '../utils'

interface Props {
  circleRadius: number,
  setPopup: Function,
  user: {
    position: {
      lat: number,
      lng: number
    },
    listingsCount: number,
    userTypeIdentifier: string,
    primaryTradeType: string,
  }
}

const Pin = ({
  user,
  circleRadius,
  setPopup,
}: Props) => {
  const {
    position,
    userTypeIdentifier,
    primaryTradeType,
  } = user

  // get the pin color
  const tradeType = primaryTradeType
    ? `${userTypeIdentifier}-${primaryTradeType}`
    : userTypeIdentifier
  const color = (colorMap as any)[tradeType]

  const handleClick = (e: any) => {
    const x = e.domEvent.clientX
    const y = e.domEvent.clientY
    setPopup({ x, y, user })
  }

  return (
    <Circle
      center={position}
      radius={circleRadius}
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

export default Pin
