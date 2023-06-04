import React from 'react'
import { View, StyleSheet } from 'react-native'
import LoadingView from '../../../components/LoadingView'
import useMultimeterSettings from './hooks/useMultimeterSettings'
import { Button, Text } from '@ui-kitten/components'


const Multimeter = () => {
    const { scanning, scanDevices } = useMultimeterSettings()
    return (
            <View style={styles.container}>
                <Button onPress={scanDevices} disabled={scanning}>Scan</Button>
                <Text>{scanning ? 'Scanning' : ''}</Text>
            </View>
    )
}

export default Multimeter

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})