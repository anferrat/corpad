import React from 'react'
import { View } from 'react-native'
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
        <View
            style={globalStyle.screen}>
            <FindItemInSurvey
                uid={uid}
                itemType={itemType}
                latitude={latitude}
                longitude={longitude}
                name={name}
                navigateToItem={navigateToItem}
                goBack={goBack} />
        </View>
    )
}