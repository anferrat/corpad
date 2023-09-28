import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView } from 'react-native'
import EditMapLayer from '../../features/edit_map_layer'

export default EditMapLayerScreen = ({ route, navigation }) => {
    const { isNew, layerId } = route.params
    return (
        <SafeAreaView style={globalStyle.screen}>
            <EditMapLayer
                isNew={isNew}
                layerId={layerId} />
        </SafeAreaView>
    )
}