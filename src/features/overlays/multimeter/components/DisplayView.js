import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Icon } from '@ui-kitten/components'
import Display from './Display'

const acessoryHold = (props) => <Icon {...props} name='pause-circle-outline' />
const acessoryPlay = (props) => <Icon {...props} name='play-circle-outline' />

const DisplayView = ({ onPlayHandler, onHoldHandler, values, onHold, onOffCaptureAvailable, onOffCaptureActive }) => {
    return (
        <View style={styles.container}>
            <Display
                onOffCaptureACtive={onOffCaptureActive}
                onOffCaptureAvailable={onOffCaptureAvailable}
                values={values} />
            <View style={styles.controls}>
                <Button
                    disabled={onHold}
                    onPress={onHoldHandler}
                    style={styles.button}
                    appearance='outline'
                    accessoryLeft={acessoryHold}>
                    Hold
                </Button>
                <Button
                    onPress={onPlayHandler}
                    disabled={!onHold}
                    style={styles.button}
                    appearance='outline'
                    accessoryLeft={acessoryPlay}>
                    Resume
                </Button>
            </View>
        </View>
    )
}

export default React.memo(DisplayView)

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12
    },
    controls: {
        marginTop: 24,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    button: {
        borderRadius: 30,
        width: 130
    }
})