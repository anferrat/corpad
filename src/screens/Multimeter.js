import React from 'react'
import { globalStyle } from '../styles/styles'
import { SafeAreaView } from 'react-native'
import MultimeterModal from '../features/overlays/multimeter'

export default MultimeterScreen = ({ route, navigation }) => {

    const goBack = () => navigation.goBack()
    return (
        <SafeAreaView style={globalStyle.screen}>
            <MultimeterModal
                goBack={goBack} />
        </SafeAreaView>
    )
}