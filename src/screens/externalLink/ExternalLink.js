import React from 'react'
import { View, SafeAreaView } from 'react-native'
import { globalStyle } from '../../styles/styles'
import { ExternalLinkView } from '../../features/overlays/external_link/view'

export default ExternalLinkScreen = ({ route, navigation }) => {
    const { link } = route.params

    const navigateToFindItem = (itemType, uid, name, latitude, longitude) => navigation.navigate('FindItemInSurvey', { uid, name, itemType, latitude, longitude })

    const navigateToPipelineMatching = () => navigation.navigate('PipelineMatching', { link })

    const navigateToItem = (itemId, itemType) => {
        navigation.navigate('PipelineSurvey')
        navigation.navigate('ViewItem', { itemId, itemType })
    }

    const navigateToSurvey = () => navigation.navigate('PipelineSurvey')

    const goBack = () => navigation.goBack()

    return (
        <SafeAreaView style={globalStyle.screen}>
            <ExternalLinkView
                navigateToFindItem={navigateToFindItem}
                navigateToItem={navigateToItem}
                navigateToPipelineMatching={navigateToPipelineMatching}
                navigateToSurvey={navigateToSurvey}
                goBack={goBack}
                link={link} />
        </SafeAreaView>
    )
}