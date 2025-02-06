import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Icon, Text } from '@ui-kitten/components'
import LoadingView from '../../../../components/LoadingView'
import { basic } from '../../../../styles/colors'

const historyIcon = (props) => <Icon {...props} name='book-open' />

const MultimeterLoadingView = ({ connected, connecting, loading, isAvailable, children, paired, executing, showModal }) => {
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
                <Button
                    onPress={showModal}
                    style={styles.button}
                    accessoryLeft={historyIcon}
                    appearance={'ghost'}>
                    History readings
                </Button>
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
    },
    button: {
        marginTop: 12
    }
})