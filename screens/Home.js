import React from 'react'
import { androidStyle } from '../styles/GlobalStyle'
import { View } from 'react-native'
import LoaderSurveyList from '../components/Home/LoaderSurveyList'


export default Home = ({ route, navigation }) => {
    const { isCloud } = route.params
    const navigateToCreate = () => navigation.navigate('CreateSurvey')
    const navigateToList = (isCloud) => navigation.navigate(isCloud ? 'CloudSurveyList' : 'DeviceSurveyList')
    return (
        <View style={androidStyle.AndroidSafeArea}>
            <LoaderSurveyList
                isCloud={isCloud}
                navigateToCreate={navigateToCreate}
                navigateToList={navigateToList}
            />
        </View>
    )
}