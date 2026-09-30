import React from 'react'
import { View, StyleSheet } from 'react-native'
import MenuListItem from '../components/MenuListItem'
import { Text } from '@ui-kitten/components'
import { useLabelPicker } from './hooks/useLabelPicker'
import { translateBottomSheet } from '../../../localization'


const LabelPicker = ({ closeSheet, params }) => {
    const { itemType, itemId } = params
    const { onPressNFC, onPressQrCode, isProcessing, isPro } = useLabelPicker({ itemId, itemType, closeSheet })
    return (
        <View
            style={styles.container}>
            <Text
                style={styles.hint}
                numberOfLines={3}
                appearance='hint'>
                {translateBottomSheet('labelHint')}
            </Text>
            <MenuListItem
                inactive={!isPro}
                disabled={isProcessing}
                onPress={onPressQrCode}
                title={translateBottomSheet('generateQr')}
                icon='qr-code'
                pack='cp' />
            <MenuListItem
                inactive={!isPro}
                disabled={isProcessing}
                onPress={onPressNFC}
                title={translateBottomSheet('writeNfc')}
                icon='nfc-filled'
                pack='cp' />
        </View>
    )
}


export default LabelPicker

const styles = StyleSheet.create({
    hint: {
        paddingHorizontal: 12,
        height: 70,
        textAlignVertical: 'top',
        textAlign: 'center'
    }
})
