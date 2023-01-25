import React, { useEffect, useContext, useState } from 'react'
import { View, StyleSheet, BackHandler } from 'react-native'
import { Modal, Text } from '@ui-kitten/components'
import { useSelector } from 'react-redux'
import { basic300, control } from '../../../styles/colors'
import { ImportData } from './ImportDataProvider'
import ImportModalContent from './components/ImportModalContent'
import IconButton from '../../../components/IconButton'


const ImportModal = ({ visible, hideModal }) => {
    const importData = useSelector(state => state.importData)
    const [importing, setImporting] = useState(false)
    const { navigateToList } = useContext(ImportData)

    const hideModalHandler = React.useCallback(() => {
        if (!importing)
            hideModal()
    }, [importing, hideModal])

    const isImporting = React.useCallback(() => {
        if (visible && !importing) {
            hideModal()
            return true
        }
        else return importing
    }, [importing, visible, hideModal])

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', isImporting)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', isImporting)
        }
    }, [isImporting])
    return (
        <Modal
            backdropStyle={styles.backdrop}
            onBackdropPress={null}
            style={styles.modal}
            visible={visible}>
            <ImportModalContent
                count={importData.data.length}
                itemType={importData.itemType}
                importHandler={async (dataCallback) => {
                    dataCallback({
                        index: 19,
                        success: true,
                        warning: false,
                        id: 1,
                        completed: false,
                    })
                }}
                importing={importing}
                setImporting={setImporting}
                navigateToList={navigateToList}
                hideModal={hideModal}
            />
        </Modal>

    )

}

export default ImportModal


const styles = StyleSheet.create({
    modal: {
        borderRadius: 10,
        padding: 12,
        flex: 1,
        height: 190,
        justifyContent: 'flex-start',
        width: '80 %',
        backgroundColor: control
    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
})