import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Modal } from '@ui-kitten/components'
import { useDispatch, useSelector } from 'react-redux'
import { control } from '../../../styles/colors'
import { ImportData } from './ImportDataProvider'
import ImportModalContent from './components/ImportModalContent'
import { importData } from '../../../app/controllers/survey/ImportController'
import { setRefresh } from '../../../store/actions/list'
import { refreshMarkers } from '../../../store/actions/map'

const ImportModal = ({ visible, hideModal }) => {
    const { itemType, data, fields, defaultNames, item, subitems, extraData, fileName } = useSelector(state => state.importData)
    const { navigateToList } = useContext(ImportData)
    const dispatch = useDispatch()

    const navigateHandler = React.useCallback(() => {
        navigateToList(itemType)
        dispatch(setRefresh(itemType))
        dispatch(refreshMarkers())
    }, [])

    const importHandler = React.useCallback((callback) => {
        return importData({
            itemType,
            pipelineList: extraData.pipelineList,
            data,
            fields,
            defaultNames,
            referenceCells: extraData.referenceCellList,
            potentialTypes: extraData.potentialTypes,
            item,
            subitems,
            callback: callback
        })
    },
        [itemType, extraData, data, fields, defaultNames, item, subitems])
    return (
        <Modal
            backdropStyle={styles.backdrop}
            onBackdropPress={null}
            style={styles.modal}
            visible={visible}>
            <ImportModalContent
                fileName={fileName}
                visible={visible}
                count={data.length}
                itemType={itemType}
                importHandler={importHandler}
                navigateToList={navigateHandler}
                hideModal={hideModal} />
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