import React, {
  useState,
  useCallback,
  memo,
  useEffect,
} from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { usersURL, getMapBounds, calculateRadius } from '../utils'
import Pin from './Pin'
import Popup from './Popup'

const containerStyle = {
  height: '100vh',
  width: '100%',
}

const App = () => {
  const [map, setMap] = useState(null)
  const [mapBounds, setMapBounds] = useState(null)
  const [circleRadius, setCircleRadius] = useState(30)
  const [users, setUsers] = useState([])
  const [popup, setPopup] = useState(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  useEffect(() => {
    // get users
    // calculate map bounds based on user pins
    const fetchUsers = async () => {
      try {
        const response = await fetch(usersURL)
        if (response.status === 200) {
          const d = await response.json()
          setMapBounds(getMapBounds(d))
          setUsers(d)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchUsers()
  }, [])

  const onLoad = useCallback((m) => {
    const {
      minLat, maxLat, minLng, maxLng,
    } = mapBounds

    const bounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(minLat, minLng),
      new window.google.maps.LatLng(maxLat, maxLng),
    )

    m.fitBounds(bounds)
    setCircleRadius(calculateRadius(m.zoom))
    setMap(m)
  }, [mapBounds])

  const onUnmount = useCallback(() => setMap(null), [])

  const closePopup = useCallback(() => setPopup(null), [])

  const handleZoomChange = useCallback(() => {
    if (!map) return
    const zoom = map.getZoom()
    setCircleRadius(calculateRadius(zoom))
    closePopup()
  }, [map, closePopup])

  return (
    <div>
      {mapBounds && isLoaded
        ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={map}
            zoom={10}
            onClick={closePopup}
            onCenterChanged={closePopup}
            onZoomChanged={handleZoomChange}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {users.map((user) => (
              <Pin
                key={user.id}
                user={user}
                circleRadius={circleRadius}
                setPopup={setPopup}
              />
            ))}
          </GoogleMap>)
        : <p>Loading...</p>}

      <Popup
        width={300}
        popup={popup}
        setPopup={setPopup}
      />
    </div >
  )
}

export default memo(App)
