import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Icon } from '@ui-kitten/components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const accessory = (props) => <Icon {...props} name='checkmark-circle-2' />

const CaptureButtonBar = ({ onCapture, onCancel }) => {
    const { bottom } = useSafeAreaInsets()
    return (
        <View style={{ ...styles.container, marginBottom: 18 + bottom }}>
            <Button
                accessoryLeft={accessory}
                onPress={onCapture}
                style={styles.button}>
                Capture
            </Button>
            <Button
                onPress={onCancel}
                style={styles.button}
                appearance='ghost'>
                Cancel
            </Button>
        </View>
    )
}

export default React.memo(CaptureButtonBar)

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-end',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        marginBottom: 18
    },
    button: {
        flex: 1,
        borderRadius: 15,
        height: 50,
        marginHorizontal: 3
    }
})