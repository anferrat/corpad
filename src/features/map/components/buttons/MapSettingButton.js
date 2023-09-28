import React from 'react'
import MapButton from './MapButton'

const MapSettingButton = ({ navigateToViewMapLayer }) => {
    return <MapButton
        icon={'menu'}
        onPress={navigateToViewMapLayer} />
}

export default React.memo(MapSettingButton)