import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import { NFC_STATUS_CODES } from '../../helpers/constants'
import Pressable from '../../../../components/Pressable'
import { translateView } from '../../../../localization'


const getLabel = (status) => {
    switch (status) {
        case null:
            return translateView('nfc.holdPhone')
        case NFC_STATUS_CODES.SUCCESS:
            return translateView('nfc.written')
        case NFC_STATUS_CODES.NOT_FORMATTED:
            return translateView('nfc.notFormatted')
        case NFC_STATUS_CODES.READ_ONLY:
            return translateView('nfc.readOnly')
        case NFC_STATUS_CODES.NOT_ENOUGH_SPACE:
            return translateView('nfc.notEnoughSpace')
        case NFC_STATUS_CODES.NFC_TURNED_OFF:
            return translateView('nfc.turnedOff')
        case NFC_STATUS_CODES.NFC_NOT_SUPPORTED:
            return translateView('nfc.notSupported')
        case NFC_STATUS_CODES.LINK_TOO_LONG:
            return translateView('nfc.linkTooLong')
        default:
            return null
    }
}

const LinkComponent = ({ handleLink }) => {
    return (
        <Pressable
            onPress={handleLink}>
            <Text
                appearance='hint'>
                https://docs.corpad.ca/tag-errors
            </Text>
        </Pressable>)
}

const ModalLabel = ({ status, handleTagErrorLink }) => {
    const label = getLabel(status)
    return (
        <View
            style={styles.container}>
            <Text
                style={styles.text}
                appearance='hint'>
                {label}
            </Text>
            {status === NFC_STATUS_CODES.NOT_FORMATTED || status === NFC_STATUS_CODES.NOT_ENOUGH_SPACE ? <LinkComponent handleLink={handleTagErrorLink} /> : null}
        </View>
    )
}

export default ModalLabel

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        minHeight: 40
    },
    text: {
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})
