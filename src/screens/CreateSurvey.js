import React from 'react'
import { SafeAreaView } from 'react-native'
import { globalStyle } from '../styles/styles'
import CreateSurvey from '../features/create_survey/CreateSurvey'

export default CreateSurveyScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={globalStyle.screen}>
            <CreateSurvey />
        </SafeAreaView>
    )
}