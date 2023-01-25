import React from 'react'
import { Button, Text } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import { getItemName } from '../helpers/functions'
import { importIcon } from '../../../../components/Icons'
import ModalTitle from './ModalTitle'

const ModalStart = ({
    count,
    itemType,
    hideModal,
    onImportStart
}) => {
    return (
        <>
            <ModalTitle hideModal={hideModal} />
            <View style={styles.content}>
                <Text
                    category='label'
                    appearance='hint'>
                    {count} {getItemName(itemType, count)} will be created.
                </Text>
                <Button
                    onPress={onImportStart}
                    accessoryLeft={importIcon}>
                    Begin import
                </Button>
            </View>
        </>
    )
}

export default ModalStart


const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 12
    },
})