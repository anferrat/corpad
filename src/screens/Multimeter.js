import React from 'react'
import { globalStyle } from '../styles/styles'
import MultimeterModal from '../features/overlays/multimeter'
import { StyleSheet, View } from 'react-native'
import { control } from '../styles/colors'

export default MultimeterScreen = ({ route, navigation }) => {

    const goBack = () => navigation.goBack()
    return (
        <View style={{ ...globalStyle.screen, ...styles.container }}>
            <MultimeterModal
                goBack={goBack} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: control
    }
})
