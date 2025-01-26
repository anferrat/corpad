import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import LoadingView from '../../../../components/LoadingView'
import { basic } from '../../../../styles/colors'


const MultimeterLoadingView = ({ connected, connecting, loading, isAvailable, children, paired, executing }) => {
    if (connecting || connected || executing)
        return (
            <LoadingView
                loading={loading || !isAvailable || executing}>
                {children}
            </LoadingView>
        )
    else {
        const text = !paired ? 'No multimeter found' : (!connected ? 'Multimeter is not connected' : 'Screen is not available')
        return (
            <View
                style={styles.container}>
                <Icon
                    name='radio'
                    fill={basic}
                    style={styles.icon} />
                <Text
                    appearance='hint'
                    style={styles.text}>
                    {text}
                </Text>
            </View>)
    }
}


export default MultimeterLoadingView

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        height: 60,
        width: 60,
        marginBottom: 12
    },
    text: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        paddingHorizontal: 12,
    }
})