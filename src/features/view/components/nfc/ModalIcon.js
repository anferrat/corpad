import React from 'react'
import { StyleSheet } from 'react-native'
import { Icon } from '@ui-kitten/components'
import { danger, primary, success } from '../../../../styles/colors'
import { NFC_STATUS_CODES } from '../../helpers/constants'

const getIcon = (status) => {
    switch (status) {
        case NFC_STATUS_CODES.SUCCESS:
            return {
                icon: 'checkmark-circle',
                fill: success
            }
        case null:
            return {
                icon: 'nfc',
                pack: 'cp',
                fill: primary
            }
        default:
            return {
                icon: 'alert-circle-outline',
                fill: danger
            }
    }
}

const ModalIcon = ({ status }) => {
    const { icon, pack, fill } = getIcon(status)
    return (
        <Icon
            name={icon}
            pack={pack}
            fill={fill}
            style={styles.icon}
        />
    )
}

export default ModalIcon

const styles = StyleSheet.create({
    icon: {
        width: 90,
        height: 90,
        marginBottom: 12
    },
})