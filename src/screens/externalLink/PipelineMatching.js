import React from 'react'
import { SafeAreaView } from 'react-native'
import { globalStyle } from '../../styles/styles'
import PipelineMatching from '../../features/overlays/external_link/add'

export default PipelineMatchingScreen = ({ route, navigation }) => {
    const { link } = route.params

    const goBack = () => navigation.goBack()

    const navigateToItem = (itemId, itemType) => {
        navigation.navigate('PipelineSurvey')
        navigation.navigate('ViewItem', { itemId, itemType })
    }

    const navigateToSurvey = () => navigation.navigate('PipelineSurvey')

    return (
        <SafeAreaView
            style={globalStyle.screen}>
            <PipelineMatching
                goBack={goBack}
                navigateToItem={navigateToItem}
                navigateToSurvey={navigateToSurvey}
                link={link} />
        </SafeAreaView>
    )
}