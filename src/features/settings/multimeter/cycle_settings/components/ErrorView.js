import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import { MultimeterSettingContext } from '../context/MultimeterSettings'
import { danger, danger100 } from '../../../../../styles/colors'

const ErrorView = ({ }) => {
    const { errorCodes } = useContext(MultimeterSettingContext)
    if (errorCodes.length > 0)
        return (
            <View
                style={styles.container}>
                <Text status='danger' style={styles.header}>Errors:</Text>
                <View
                    style={styles.errors}>
                    {errorCodes.map(error => {
                        switch (error) {
                            case 'timeError':
                                return <Text key={error} status='danger' category='s2'>- Cycle time must be less than 60 000 ms and more than 200 ms.</Text>
                            case 'delayError':
                                return <Text key={error} status='danger' category='s2'>- Delay must be less than half of cycle time and more than 20 ms.</Text>
                            default:
                                return null
                        }
                    })}
                </View>
            </View>
        )
}


export default ErrorView

const styles = StyleSheet.create({
    container: {
        backgroundColor: danger100,
        minHeight: 100,
        justifyContent: 'center',
        padding: 12,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: danger,
        marginBottom: 12
    },
    header: {
    },
    errors: {
        flex: 1,
        justifyContent: 'center',
    }
})