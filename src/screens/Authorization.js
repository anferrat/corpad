import React from 'react'
import { SafeAreaView } from 'react-native'
import { globalStyle } from '../styles/styles'

import { Authorization } from '../features/authorization'

export default AuthorizationScreen = () => {
    return (
        <SafeAreaView style={{ ...globalStyle.screen, justifyContent: 'center' }}>
            <Authorization />
        </SafeAreaView>
    )
}


