import React from 'react'
import { useSelector } from 'react-redux'
import MapButton from './components/MapButton'

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

