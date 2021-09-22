const usersURL = 'http://localhost:3000/users'

const getMapBounds = (data) => {
  let maxLat = 0
  let minLat = 0
  let maxLng = 0
  let minLng = 0

  data.forEach(({ position }, i) => {
    if (i === 0) {
      minLat = position.lat
      maxLat = position.lat
      minLng = position.lng
      maxLng = position.lng
      return
    }

    minLat = Math.min(minLat, position.lat)
    maxLat = Math.max(maxLat, position.lat)
    minLng = Math.min(minLng, position.lng)
    maxLng = Math.max(maxLng, position.lng)
  })

  return { minLat, maxLat, minLng, maxLng }
}

const colorMap = {
  farmer: 'grey',
  'farmer-seller': 'yellow',
  'farmer-buyer': 'green',
  trading_house: 'blue',
  advisor: 'black',
  mill: 'orange',
}

const calculateRadius = (zoom) => 30000

export {
  usersURL,
  getMapBounds,
  colorMap,
  calculateRadius,
}
