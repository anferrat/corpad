import React from 'react'
import { globalStyle } from '../styles/styles'
import { SafeAreaView } from 'react-native'
import { SurveyFileList } from '../features/survey_list'


export default SurveyList = ({ route, navigation }) => {
    const { isCloud } = route.params
    const navigateToCreateSurvey = () => navigation.navigate('CreateSurvey')
    const navigateToSurveyFileList = ({ isCloud }) => navigation.navigate(!isCloud ? 'DeviceSurveyList' : 'CloudSurveyList')
    return (
        <SafeAreaView style={globalStyle.screen}>
            <SurveyFileList
                isCloud={isCloud}
                navigateToSurveyFileList={navigateToSurveyFileList}
                navigateToCreateSurvey={navigateToCreateSurvey} />
        </SafeAreaView>
    )
}