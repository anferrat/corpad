import React from 'react'
import MapButton from './MapButton'

const MapSettingButton = ({ navigateToViewMapLayer }) => {
    return <MapButton
        icon={'layers'}
        onPress={navigateToViewMapLayer} />
}

export default React.memo(MapSettingButton)