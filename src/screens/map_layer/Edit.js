import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import EditMapLayer from '../../features/edit_map_layer'

export default EditMapLayerScreen = ({ route, navigation }) => {
    const { isNew, layerId } = route.params
    return (
        <SafeAreaView style={globalStyle.screen} edges={['left', 'right', 'bottom']}>
            <EditMapLayer
                isNew={isNew}
                layerId={layerId} />
        </SafeAreaView>
    )
}
