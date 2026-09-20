import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import { NFC_STATUS_CODES } from '../../helpers/constants'
import { translateView } from '../../../../localization'

const getNfcHeader = (status, loading, linkReady) => {
    switch (status) {
        case null:
            if (loading)
                if (linkReady)
                    return translateView('nfc.writing')
                else
                    return translateView('nfc.preparing')
            else
                return translateView('nfc.ready')
        case NFC_STATUS_CODES.SUCCESS:
            return translateView('nfc.success')
        default:
            return translateView('nfc.error')
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
                     {size} {translateView('bytes')}
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
