import React, { useState } from 'react'
import { Modal, StyleSheet } from 'react-native'
import { Button } from '@ui-kitten/components'
import { addIcon } from '../Icons'
import PotentialsTypeModal from './PotentialsTypeModal'
import ReferenceCellModal from './ReferenceCellModal'

const initModalData = {
    visible: 0, //0 - hidden, 1 - potentialTypes, 2- referenceCells
    selectedTypeIndex: null //stores SelectedTypeIndex in case ref cell selection is there
}

export const AddPotentials = React.memo(({ referenceCellList, potentialTypes, selectedTypes, onSelect }) => {
    //selectedTypes = array of objects {referenceCellIndex: <index>, potentialTypeIndex: <index>, ...} where index is index of reference cells and potential types combos that are already in use (Duplicates are not allowed)
    const [modalData, setModalData] = useState(initModalData)
    const itemList = referenceCellList.map((_, i) => (
        {
            index: i,
            potentialTypes: potentialTypes.map((_, j) => j)
                .filter((_, j) => selectedTypes.findIndex(st => st.referenceCellIndex === i && st.potentialTypeIndex === j) === -1)
        }))
        .filter(referenceCell => referenceCell.potentialTypes.length !== 0)

    const showPotentialTypeSelector = React.useCallback(() => {
        setModalData(old => ({ ...old, visible: 1 }))
    }, [setModalData])

    const hideModal = React.useCallback(() => {
        setModalData(initModalData)
    }, [setModalData])

    const onTypeSelect = React.useCallback((typeIndex) => {
        if (referenceCellList.length === 1) {
            hideModal()
            onSelect(typeIndex, 0)
        }
        else {
            setModalData({
                visible: 2,
                selectedTypeIndex: typeIndex
            })
        }
    }, [hideModal, setModalData])

    const onReferenceSelect = (rc) => {
        onSelect(modalData.selectedTypeIndex, rc)
        hideModal()
    }

    if (!referenceCellList || !potentialTypes)
        return null
    else
        return (
            <>
                <Button
                    disabled={itemList.length === 0}
                    onPress={showPotentialTypeSelector}
                    appearance='ghost'
                    accessoryLeft={addIcon}>
                    Add potentials
                </Button>
                <Modal
                    animationType="slide"
                    statusBarTranslucent={true}
                    style={styles.modal}
                    onRequestClose={hideModal}
                    visible={modalData.visible === 1}>
                    <PotentialsTypeModal
                        itemList={itemList}
                        dismiss={hideModal}
                        potentialTypes={potentialTypes}
                        onSelect={onTypeSelect} />
                </Modal>
                <Modal
                    style={styles.modal}
                    animationType="slide"
                    statusBarTranslucent={true}
                    onRequestClose={hideModal}
                    visible={modalData.visible === 2}>
                    <ReferenceCellModal
                        dismiss={hideModal}
                        itemList={itemList}
                        selectedTypeIndex={modalData.selectedTypeIndex}
                        referenceCellList={referenceCellList}
                        onSelect={onReferenceSelect}
                    />
                </Modal>
            </>
        )
})

const styles = StyleSheet.create({
    modal: {
        flex: 1
    },
})