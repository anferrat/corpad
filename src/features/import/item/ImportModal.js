import React, { useContext } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { Modal } from '@ui-kitten/components'
import { useDispatch, useSelector } from 'react-redux'
import { control } from '../../../styles/colors'
import { ImportData } from './ImportDataProvider'
import ImportModalContent from './components/ImportModalContent'
import { importData } from '../../../app/controllers/survey/ImportController'
import { setRefresh } from '../../../store/actions/list'
import { resetMap } from '../../../store/actions/map'

const MODAL_HEIGHT = 190

const ImportModal = ({ visible, hideModal }) => {
    const { itemType, data, fields, defaultNames, item, subitems, extraData, fileName } = useSelector(state => state.importData)
    const { navigateToList } = useContext(ImportData)
    const dispatch = useDispatch()
    const { height } = useWindowDimensions()

    const navigateHandler = React.useCallback(() => {
        hideModal()
        navigateToList(itemType)
        dispatch(setRefresh(itemType))
        dispatch(resetMap())
    }, [dispatch, hideModal, itemType, navigateToList])

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
            style={[styles.modal, { top: Math.max(12, (height - MODAL_HEIGHT) / 2) }]}
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
        height: MODAL_HEIGHT,
        justifyContent: 'flex-start',
        width: '90%',
        maxWidth: 420,
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: control
    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
})
