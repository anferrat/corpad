import React from 'react'
import MapButton from '../_Stateless/Map/MapButton'
import { useSelector } from 'react-redux'

const MyLocationButton = (props) => {
    const myLocationActive = useSelector(state => state.map.myLocationActive)
    return (
        <MapButton
            onPress={props.zoomToMyLocation}
            icon={myLocationActive ? 'navigation-2' : 'navigation-2-outline'}
            status={myLocationActive ? 'primary' : 'basic'} />
    )
}

export default React.memo(MyLocationButton)

