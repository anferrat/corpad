import React from 'react'
import { Button, Text } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import { getItemIcon, getItemName } from '../helpers/functions'
import { importIcon } from '../../../../components/Icons'
import ModalTitle from './ModalTitle'
import { primary } from '../../../../styles/colors'
import ModalStatusRow from './ModalStatusRow'

const ModalStart = ({
    count,
    itemType,
    fileName,
    hideModal,
    onImportStart
}) => {
    return (
        <>
            <ModalTitle
                title={'Import from .csv'}
                iconFill={primary}
                icon='download-outline'
                hideModal={hideModal} />
            <View style={styles.content}>
                <View style={styles.status}>
                    <ModalStatusRow icon='file-text-outline'>
                        {fileName}
                    </ModalStatusRow>
                    <ModalStatusRow icon={getItemIcon(itemType)} pack='cp'>
                        {count} {getItemName(itemType, count)} will be created.
                    </ModalStatusRow>
                </View>
                <View style={styles.buttons}>
                    <Button
                        style={styles.button}
                        appearance='outline'
                        onPress={hideModal}>
                        Cancel
                    </Button>
                    <Button
                        style={styles.button}
                        onPress={onImportStart}
                        accessoryLeft={importIcon}>
                        Start
                    </Button>
                </View>
            </View>
        </>
    )
}

export default ModalStart


const styles = StyleSheet.create({
    status: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 12
    },
    content: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    buttons: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    button: {
        width: '48%'
    }
})