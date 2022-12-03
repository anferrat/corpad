import React from 'react'
import { globalStyle } from '../styles/styles'
import { SafeAreaView } from 'react-native'
import LoaderSurveyList from '../features/survey_list/LoaderSurveyList'


export default SurveyList = ({ route, navigation }) => {
    const { isCloud } = route.params
    const navigateToCreate = () => navigation.navigate('CreateSurvey')
    const navigateToList = (isCloud) => navigation.navigate(isCloud ? 'CloudSurveyList' : 'DeviceSurveyList')
    return (
        <SafeAreaView style={globalStyle.screen}>
            <LoaderSurveyList
                isCloud={isCloud}
                navigateToCreate={navigateToCreate}
                navigateToList={navigateToList} />
        </SafeAreaView>
    )
}