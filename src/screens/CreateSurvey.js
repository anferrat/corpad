import React from 'react'
import { View } from 'react-native'
import { globalStyle } from '../styles/styles'
import { CreateSurvey } from '../features/create_survey/index'

export default CreateSurveyScreen = ({ route, navigation }) => {
    const { withImport } = route.params
    const navigateToImport = () => navigation.navigate('ImportFile')
    return (
        <View style={globalStyle.screen}>
            <CreateSurvey
                withImport={withImport}
                navigateToImport={navigateToImport} />
        </View>
    )
}