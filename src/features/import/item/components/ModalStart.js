import React from 'react'
import { Button } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import { getItemIcon, getItemName } from '../helpers/functions'
import { importIcon } from '../../../../components/Icons'
import ModalTitle from './ModalTitle'
import { primary } from '../../../../styles/colors'
import ModalStatusRow from './ModalStatusRow'
import { translateImport } from '../../../../localization'

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
                title={translateImport('item.importFromSpreadsheet')}
                iconFill={primary}
                icon='download-outline'
                hideModal={hideModal} />
            <View style={styles.content}>
                <View style={styles.status}>
                    <ModalStatusRow icon='file-text-outline'>
                        {fileName}
                    </ModalStatusRow>
                    <ModalStatusRow icon={getItemIcon(itemType)} pack='cp'>
                        {translateImport('item.toCreate', { name: getItemName(itemType), count })}
                    </ModalStatusRow>
                </View>
                <View style={styles.buttons}>
                    <Button
                        style={styles.button}
                        appearance='outline'
                        onPress={hideModal}>
                        {translateImport('item.cancel')}
                    </Button>
                    <Button
                        style={styles.button}
                        onPress={onImportStart}
                        accessoryLeft={importIcon}>
                        {translateImport('item.start')}
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
