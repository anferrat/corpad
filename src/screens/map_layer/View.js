import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView } from 'react-native'
import { ViewMapLayer } from '../../features/view_map_layer'

export default ViewMapLayerScreen = ({ navigation }) => {
    const navigateToEditMapLayer = (isNew, layerId = null) => navigation.navigate('EditMapLayer', { layerId, isNew })
    const goBack = () => navigation.goBack()
    return (
        <SafeAreaView style={globalStyle.screen}>
            <ViewMapLayer
                goBack={goBack}
                navigateToEditMapLayer={navigateToEditMapLayer} />
        </SafeAreaView>
    )
}