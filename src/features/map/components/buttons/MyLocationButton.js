import React from 'react'
import MapButton from './MapButton'

const MyLocationButton = ({ zoomToUserLocation }) => {
    return (
        <MapButton
            onPress={zoomToUserLocation}
            icon={'navigation-2'}
            status={'basic'} />
    )
}

export default React.memo(MyLocationButton)

