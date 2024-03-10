import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from '@ui-kitten/components'
import { NFC_BUTTON_LABELS, NFC_STATUS_CODES } from '../../helpers/constants'

const getButtonProperties = (status) => {
    switch (status) {
        case null:
        case NFC_STATUS_CODES.READ_ONLY:
        case NFC_STATUS_CODES.NOT_FORMATTED:
        case NFC_STATUS_CODES.NOT_ENOUGH_SPACE:
        case NFC_STATUS_CODES.NFC_NOT_SUPPORTED:
        case NFC_STATUS_CODES.NFC_TURNED_OFF:
            return {
                appearance: 'outline',
                label: `${NFC_BUTTON_LABELS.READY}`,
            }
        case NFC_STATUS_CODES.SUCCESS:
            return {
                appearance: 'outline',
                label: NFC_BUTTON_LABELS.SUCCESS,
            }
        default:
            return {
                appearance: 'outline',
                label: NFC_BUTTON_LABELS.UKNOWN_ERROR,
            }
    }
}

const ModalButton = ({ status, loading, reset, retry }) => {
    const { label, appearance } = getButtonProperties(status)
    const isUnknownError = !Object.values(NFC_STATUS_CODES).includes(status)
    return (
        <Button
            style={styles.button}
            disabled={loading && status === null}
            onPress={isUnknownError && status !== null ? retry : reset}
            appearance={appearance}>
            {label}
        </Button>
    )
}

export default ModalButton

const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50
    },
})