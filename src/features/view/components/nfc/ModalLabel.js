import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import { NFC_LABELS, NFC_STATUS_CODES } from '../../helpers/constants'
import Pressable from '../../../../components/Pressable'


const getLabel = (status) => {
    switch (status) {
        case null:
            return NFC_LABELS.READY
        case NFC_STATUS_CODES.SUCCESS:
            return NFC_LABELS.SUCCESS
        case NFC_STATUS_CODES.NOT_FORMATTED:
            return NFC_LABELS.NOT_FORMATTED
        case NFC_STATUS_CODES.READ_ONLY:
            return NFC_LABELS.READ_ONLY
        case NFC_STATUS_CODES.NOT_ENOUGH_SPACE:
            return NFC_LABELS.NOT_ENOUGH_SPACE
        case NFC_STATUS_CODES.NFC_TURNED_OFF:
            return NFC_LABELS.TURNED_OFF
        case NFC_STATUS_CODES.NFC_NOT_SUPPORTED:
            return NFC_LABELS.NOT_SUPPORTED
        case NFC_STATUS_CODES.LINK_TOO_LONG:
            return NFC_LABELS.LINK_TOO_LONG
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