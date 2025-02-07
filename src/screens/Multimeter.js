import React from 'react'
import { globalStyle } from '../styles/styles'
import { SafeAreaView } from 'react-native'
import MultimeterModal from '../features/overlays/multimeter'
import { StyleSheet } from 'react-native'
import { control } from '../styles/colors'

export default MultimeterScreen = ({ route, navigation }) => {

    const goBack = () => navigation.goBack()
    return (
        <SafeAreaView style={{ ...globalStyle.screen, ...styles.container }}>
            <MultimeterModal
                goBack={goBack} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: control
    }
})