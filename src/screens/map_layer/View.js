import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ViewMapLayer } from '../../features/view_map_layer'

export default ViewMapLayerScreen = ({ navigation }) => {
    const navigateToEditMapLayer = (isNew, layerId = null) => navigation.navigate('EditMapLayer', { layerId, isNew })
    const goBack = () => navigation.goBack()
    return (
        <SafeAreaView style={globalStyle.screen} edges={['left', 'right', 'bottom']}>
            <ViewMapLayer
                goBack={goBack}
                navigateToEditMapLayer={navigateToEditMapLayer} />
        </SafeAreaView>
    )
}
