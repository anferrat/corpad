import React from 'react'
import MapButton from './MapButton'

const SatelliteButton = ({ toggleSatelliteMode, satelliteMode }) => {
    return (
        <MapButton
            onPress={toggleSatelliteMode}
            icon={satelliteMode ? 'globe-2' : 'globe-2-outline'} />
    )
}
export default React.memo(SatelliteButton)

