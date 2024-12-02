import React from 'react'
import { View, StyleSheet } from 'react-native'
import MenuListItem from '../components/MenuListItem'
import { Text } from '@ui-kitten/components'
import { useLabelPicker } from './hooks/useLabelPicker'


const LabelPicker = ({ closeSheet, params }) => {
    const { itemType, itemId } = params
    const { onPressNFC, onPressQrCode, isPro } = useLabelPicker({ itemId, itemType, closeSheet })
    return (
        <View
            style={styles.container}>
            <Text
                style={styles.hint}
                numberOfLines={3}
                appearance='hint'>
                The data will be saved to the label and can be accessed offline by anyone with Corpad app.
            </Text>
            <MenuListItem
                inactive={!isPro}
                onPress={onPressQrCode}
                title='Generate QR code'
                icon='qr-code'
                pack='cp' />
            <MenuListItem
                inactive={!isPro}
                onPress={onPressNFC}
                title='Write to NFC tag'
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