import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { basic, control, success } from '../../../../../styles/colors'
import { Text } from '@ui-kitten/components'


const StatusView = ({ connected, connecting }) => {
    const status = connecting && !connected ? 'Connecting' : (connected ? 'Connected' : 'Disconnected')
    return (
        <View style={styles.container}>
            <View style={connected ? styles.success : styles.basic}>
                <View style={styles.label}>
                    {connecting && !connected ?
                        <ActivityIndicator
                            color={control}
                            size={'small'}
                            style={styles.activityIndicator} /> : null}
                    <Text
                        category='p2'
                        status='control'>
                        {status}</Text>
                </View>
            </View>
        </View>
    )
}

export default StatusView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: 110,
        maxHeight: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        overflow: 'hidden'
    },
    success: {
        width: '100%',
        height: '100%',
        backgroundColor: success
    },
    basic: {
        width: '100%',
        height: '100%',
        backgroundColor: basic
    },
    label: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
   
    activityIndicator: {
        marginRight: 8
    }
})