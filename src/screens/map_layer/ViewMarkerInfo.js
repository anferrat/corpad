import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapLayerMarkerView from '../../features/view_map_layer_marker'

export default ViewMarkerInfo = ({ navigation, route }) => {
    const goBack = () => navigation.goBack()
    const { layerId, markerIndex } = route.params
    return (
        <SafeAreaView
            style={globalStyle.screen}
            edges={['left', 'right', 'bottom']}>
            <MapLayerMarkerView
                goBack={goBack}
                layerId={layerId}
                markerIndex={markerIndex} />
        </SafeAreaView>
    )
}
