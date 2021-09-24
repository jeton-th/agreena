const usersURL = 'http://localhost:3000/users'

const getMapBounds = (data: Array<any>) => {
  let maxLat = 0
  let minLat = 0
  let maxLng = 0
  let minLng = 0

  data.forEach((d: { position: { lat: number, lng: number } }, i: number) => {
    if (i === 0) {
      minLat = d.position.lat
      maxLat = d.position.lat
      minLng = d.position.lng
      maxLng = d.position.lng
      return
    }

    minLat = Math.min(minLat, d.position.lat)
    maxLat = Math.max(maxLat, d.position.lat)
    minLng = Math.min(minLng, d.position.lng)
    maxLng = Math.max(maxLng, d.position.lng)
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

const calculateRadius = (zoom: number) => 200000 / Math.pow(2, zoom / 1.5)

export {
  usersURL,
  getMapBounds,
  colorMap,
  calculateRadius,
}
