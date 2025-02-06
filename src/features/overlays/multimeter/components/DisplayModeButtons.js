import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, ButtonGroup, Text } from '@ui-kitten/components'


const DisplayModeButtons = ({ selectedMode, onDigitPress, onGraphPress }) => {
    return (
        <View
            style={styles.container}>
            <Button
                size={'small'}
                style={styles.button}
                disabled={selectedMode === 0}
                appearance={selectedMode === 0 ? 'outline' : 'ghost'}
                onPress={onDigitPress}>
                {() => <Text status='primary'>Digits</Text>}
            </Button>
            <Button
                style={styles.button}
                disabled={selectedMode === 1}
                appearance={selectedMode === 1 ? 'outline' : 'ghost'}
                onPress={onGraphPress}>
                {() => <Text status='primary'>Graph</Text>}
            </Button>

        </View>
    )
}


export default DisplayModeButtons

const styles = StyleSheet.create({
    button: {
        width: 150,
        borderWidth: 0
    },
    container: {
        marginTop: 24,
        justifyContent: 'center',
        flexDirection: 'row',
    },
})