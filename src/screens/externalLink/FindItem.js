import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalStyle } from '../../styles/styles'
import FindItemInSurvey from '../../features/overlays/external_link/find'

export default ExternalLinkScreen = ({ route, navigation }) => {
    const { uid, itemType, latitude, longitude, name } = route.params

    const navigateToItem = (id) => {
        navigation.navigate('PipelineSurvey')
        navigation.navigate('ViewItem', { itemId: id, itemType: itemType })
    }

    const goBack = () => navigation.goBack()

    return (
        <SafeAreaView
            style={globalStyle.screen}
            edges={['left', 'right', 'bottom']}>
            <FindItemInSurvey
                uid={uid}
                itemType={itemType}
                latitude={latitude}
                longitude={longitude}
                name={name}
                navigateToItem={navigateToItem}
                goBack={goBack} />
        </SafeAreaView>
    )
}
