import React from 'react'
import { Button, Text } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import { translateImport } from '../../../../localization'

const ModalError = ({
    hideModal
}) => {
    return (
        <View style={styles.view}>
            <Text category='h6'>{translateImport('item.error')}</Text>
            <Text style={styles.text}>{translateImport('item.noItemsToImport')}</Text>
            <Button appearance='ghost' onPress={hideModal}>{translateImport('item.close')}</Button>
        </View>
    )
}

export default ModalError


const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'space-between',
    },
    text: {
        padding: 12
    }
})
