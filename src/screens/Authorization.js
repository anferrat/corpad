import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalStyle } from '../styles/styles'

import { Authorization } from '../features/authorization'

export default AuthorizationScreen = () => {
    return (
        <SafeAreaView
            style={{ ...globalStyle.screen, justifyContent: 'center' }}
            edges={['left', 'right', 'bottom']}>
            <Authorization />
        </SafeAreaView>
    )
}
