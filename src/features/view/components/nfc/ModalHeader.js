import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import { NFC_HEADERS, NFC_STATUS_CODES } from '../../helpers/constants'

const getNfcHeader = (status, loading, linkReady) => {
    switch (status) {
        case null:
            if (loading)
                if (linkReady)
                    return NFC_HEADERS.WRITING
                else
                    return NFC_HEADERS.PREPARING
            else
                return NFC_HEADERS.READY
        case NFC_STATUS_CODES.SUCCESS:
            return NFC_HEADERS.SUCCESS
        default:
            return NFC_HEADERS.ERROR
    }
}

const ModalHeader = ({ status, loading, linkReady, size }) => {
    const header = getNfcHeader(status, loading, linkReady)
    return (
        <View
            style={styles.container}>
            <Text category='h5'>
                {header}
            </Text>
            {size && (status === null) ?
                <Text
                    appearance='hint'
                    category='s1'>
                    {size} bytes
                </Text>
                : null}
        </View>
    )
}

export default ModalHeader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        minHeight: 50
    },
})