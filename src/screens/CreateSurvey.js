import React from 'react'
import { View } from 'react-native'
import { globalStyle } from '../styles/styles'
import { CreateSurvey } from '../features/create_survey/index'

export default CreateSurveyScreen = ({ navigation }) => {
    return (
        <View style={globalStyle.screen}>
            <CreateSurvey />
        </View>
    )
}