import React from 'react'
import { SafeAreaView } from 'react-native'
import { androidStyle } from '../styles/GlobalStyle'
import Authorization from '../components/Home/Authorization'
import AuthScreenMessage from '../components/_Stateless/SurveyList/AuthScreenMessage'

const CloudAuth = () => {
    return (
        <SafeAreaView style={{...androidStyle.AndroidSafeArea, justifyContent: 'center'}}>
            <AuthScreenMessage />
            <Authorization />
        </SafeAreaView>
    )
}

export default CloudAuth
